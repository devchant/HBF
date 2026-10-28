import type { SupabaseClient } from "@supabase/supabase-js";

/** Total cap for images and donation proofs in Supabase Storage. */
export const MEDIA_MAX_BYTES = 400 * 1024 * 1024;
/** Stop new uploads once usage reaches this (approaching the 400 MB max). */
export const MEDIA_STOP_BYTES = 380 * 1024 * 1024;

export type MediaQuota = {
  usedBytes: number;
  maxBytes: number;
  remainingBytes: number;
  percent: number;
  locked: boolean;
  approaching: boolean;
};

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function getMediaQuota(supabase: SupabaseClient): Promise<MediaQuota> {
  const { data, error } = await supabase.rpc("media_storage_bytes");
  if (error) throw error;
  const usedBytes = Number(data ?? 0);
  const remainingBytes = Math.max(0, MEDIA_MAX_BYTES - usedBytes);
  const percent = Math.min(100, Math.round((usedBytes / MEDIA_MAX_BYTES) * 100));
  const approaching = usedBytes >= MEDIA_STOP_BYTES;
  const locked = approaching || usedBytes >= MEDIA_MAX_BYTES;
  return { usedBytes, maxBytes: MEDIA_MAX_BYTES, remainingBytes, percent, locked, approaching };
}

export function uploadBlockedReason(quota: MediaQuota, incomingBytes: number) {
  if (quota.locked) {
    return `Image storage is at ${formatBytes(quota.usedBytes)} of ${formatBytes(quota.maxBytes)}. New uploads are closed until files are removed.`;
  }
  if (quota.usedBytes + incomingBytes > MEDIA_MAX_BYTES) {
    return `This file is ${formatBytes(incomingBytes)}. Only ${formatBytes(quota.remainingBytes)} remains of the 400 MB limit.`;
  }
  return null;
}
