export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap footer-grid">
        <RevealBlock title="Contact">
          <p>
            Nigeria: <a href="mailto:info@humanitarianbetterment.org">info@humanitarianbetterment.org</a>
            <br />
            07085709872
            <br />
            <a href="https://humanitarianbetterment.org">humanitarianbetterment.org</a>
          </p>
          <p>
            Canada: Surrey, British Columbia
            <br />
            <a href="https://humanitarianbetterment.ca">humanitarianbetterment.ca</a>
            <br />
            Surrey programs: <a href="https://www.hbfcanada.ca">hbfcanada.ca</a>
          </p>
        </RevealBlock>
        <RevealBlock title="HBF Nigeria">
          <p>CAC/IT/167408. SCUML. Special Consultative Status with UN ECOSOC since 21 July 2026.</p>
          <p>
            <a href="/donate-nigeria">Donate Nigeria</a>
          </p>
        </RevealBlock>
        <RevealBlock title="HBF Canada Society">
          <p>
            Incorporated in British Columbia. Registration No. S0086143. Not a registered charity under the CRA
            (application in progress). Affiliated with HBF Nigeria. Does not hold ECOSOC status.
          </p>
          <p>
            <a href="https://humanitarianbetterment.ca/donate">Donate Canada</a>
          </p>
        </RevealBlock>
      </div>
      <div className="wrap fine">
        <p>
          © 2021–2026 Humanitarian Betterment Foundation. Donations to HBF Nigeria and HBF Canada Society are
          received by separate legal entities and accounted separately.
        </p>
      </div>
    </footer>
  );
}

function RevealBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
