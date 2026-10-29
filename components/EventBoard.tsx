import type { SiteEvent } from "@/lib/cms";

export function EventBoard({
  events,
  heading,
  location,
}: {
  events: SiteEvent[];
  heading: string;
  location?: string;
}) {
  const current = events.filter((event) => event.status !== "past");
  const history = events.filter((event) => event.status === "past");
  if (current.length === 0 && history.length === 0) return null;

  return (
    <>
      {current.length > 0 ? (
        <EventGrid events={current} kicker="Calendar" heading={heading} location={location} />
      ) : null}
      {history.length > 0 ? (
        <EventGrid events={history} kicker="Archive" heading="Event history" location={location} />
      ) : null}
    </>
  );
}

function EventGrid({
  events,
  kicker,
  heading,
  location,
}: {
  events: SiteEvent[];
  kicker: string;
  heading: string;
  location?: string;
}) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h2>{heading}</h2>
        <div className="campaigns" style={{ marginTop: 22 }}>
          {events.map((event) => (
            <article className="campaign" key={event.id}>
              <div className="campaign-media">
                {event.imageUrl ? (
                  <img src={event.imageUrl} alt="" />
                ) : (
                  <div className="campaign-fallback">
                    <strong>{event.status === "upcoming" ? "Soon" : event.status === "ongoing" ? "Now" : "Past"}</strong>
                  </div>
                )}
                <span className="chip">{chip(event.status, location)}</span>
              </div>
              <div className="campaign-body">
                {location && event.status === "upcoming" ? (
                  <p className="kicker">Upcoming · {location}</p>
                ) : null}
                <h2>{event.title}</h2>
                {event.summary ? <p>{event.summary}</p> : null}
                {event.eventDate ? (
                  <div className="meta-row">
                    <span>{event.eventDate}</span>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function chip(status: SiteEvent["status"], location?: string) {
  if (status === "upcoming") return location ? `Upcoming · ${location}` : "Upcoming";
  if (status === "ongoing") return "Ongoing";
  return "Past";
}
