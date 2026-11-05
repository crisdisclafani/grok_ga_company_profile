(function () {
  const S = window.SITE;
  if (!S) return;

  function get(path) {
    return path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
  }

  document.querySelectorAll("[data-bind]").forEach((el) => {
    const val = get(el.getAttribute("data-bind"));
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const val = get(el.getAttribute("data-bind-href"));
    if (val != null) el.setAttribute("href", val);
  });

  // Meta
  if (S.meta) {
    document.title = S.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", S.meta.description);
  }

  // Nav
  const nav = document.getElementById("site-nav");
  nav.innerHTML = S.nav
    .map((item) => `<a href="#${item.id}">${item.label}</a>`)
    .join("");

  const toggle = document.querySelector(".nav-toggle");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  // Challenge body
  const challenge = document.getElementById("challenge-body");
  challenge.innerHTML = S.challenge.body.map((p) => `<p>${p}</p>`).join("");

  // Pillars
  document.getElementById("pillars").innerHTML = S.pillars.items
    .map(
      (p) =>
        `<article class="pillar"><span class="n">${p.n}</span><p>${p.text}</p></article>`
    )
    .join("");

  // Timeline
  document.getElementById("timeline").innerHTML = S.story.milestones
    .map(
      (m) =>
        `<article class="t-item"><div class="t-year">${m.year}</div><h3>${m.title}</h3><p>${m.text}</p></article>`
    )
    .join("");

  // Principles
  document.getElementById("principles").innerHTML = S.story.principles
    .map(
      (p, i) =>
        `<li><span>${i + 1}</span><div>${p}</div></li>`
    )
    .join("");

  // Impact
  document.getElementById("impact").innerHTML = S.impact.items
    .map(
      (it) =>
        `<article class="impact-card"><strong>${it.value}</strong><h3>${it.label}</h3><p>${it.note}</p></article>`
    )
    .join("");

  // Capabilities
  document.getElementById("capabilities").innerHTML = S.operations.capabilities
    .map(
      (c) =>
        `<article class="cap"><h3>${c.title}</h3><p>${c.text}</p></article>`
    )
    .join("");

  // Assets tabs
  const tabs = document.getElementById("asset-tabs");
  const panels = document.getElementById("asset-panels");
  tabs.innerHTML = S.assets.items
    .map(
      (a, i) =>
        `<button class="asset-tab" role="tab" id="tab-${a.id}" aria-controls="panel-${a.id}" aria-selected="${i === 0}" data-id="${a.id}" type="button">${a.name}</button>`
    )
    .join("");

  panels.innerHTML = S.assets.items
    .map((a, i) => {
      const infra = a.infra
        .map(
          (x) =>
            `<article class="infra"><h4>${x.title}</h4><p>${x.text}</p></article>`
        )
        .join("");
      const stats = a.stats
        .map((s) => `<li>${s}</li>`)
        .join("");
      const innovation = a.innovation
        ? `<div class="asset-note">${a.innovation}</div>`
        : "";
      return `<div class="asset-panel" role="tabpanel" id="panel-${a.id}" aria-labelledby="tab-${a.id}" ${i ? "hidden" : ""}>
        <p class="eyebrow">${a.tag}</p>
        <h3 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.8rem,3vw,2.5rem);margin:0 0 .8rem;color:var(--navy);">${a.name}</h3>
        <p class="summary">${a.summary}</p>
        ${innovation}
        <ul class="stat-list">${stats}</ul>
        <div class="infra-grid">${infra}</div>
      </div>`;
    })
    .join("");

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest(".asset-tab");
    if (!btn) return;
    const id = btn.dataset.id;
    tabs.querySelectorAll(".asset-tab").forEach((b) =>
      b.setAttribute("aria-selected", String(b === btn))
    );
    panels.querySelectorAll(".asset-panel").forEach((p) => {
      p.hidden = p.id !== `panel-${id}`;
    });
  });

  // Q&A
  document.getElementById("qa").innerHTML = S.interview.qa
    .map(
      (item, i) =>
        `<details ${i === 0 ? "open" : ""}><summary>${item.q}</summary><p>${item.a}</p></details>`
    )
    .join("");

  // Species
  document.getElementById("species-core").innerHTML = S.species.core
    .map(
      (s) =>
        `<article class="species-card"><h3>${s.name}</h3><div class="aka">${s.aka}</div><p>${s.text}</p></article>`
    )
    .join("");
  document.getElementById("species-adv").innerHTML = S.species.advantages
    .map((x) => `<li>${x}</li>`)
    .join("");
  document.getElementById("species-spec").innerHTML = S.species.specificity
    .map((x) => `<li>${x}</li>`)
    .join("");

  // Ownership
  document.getElementById("owners").innerHTML = S.ownership.nodes
    .map(
      (n) =>
        `<article class="owner"><strong>${n.name}</strong><span>${n.detail}</span><em>${n.pct} <span class="placeholder">from PDF</span></em></article>`
    )
    .join("");

  // Team
  document.getElementById("team-grid").innerHTML = S.team.members
    .map(
      (m) =>
        `<article class="person"><h3>${m.name}</h3><div class="role">${m.role}</div><p>${m.bio}</p></article>`
    )
    .join("");

  // Network
  document.getElementById("places").innerHTML = S.network.places
    .map(
      (p) =>
        `<article class="place"><h3>${p.name}</h3><p>${p.text}</p></article>`
    )
    .join("");

  // Growth
  document.getElementById("growth-pillars").innerHTML = S.growth.pillars
    .map(
      (g) =>
        `<article class="growth"><h3>${g.title}</h3><p>${g.text}</p></article>`
    )
    .join("");

  // Contact
  const email = S.contact.email;
  const web = S.contact.website;
  const mailLink = document.getElementById("contact-email");
  mailLink.href = `mailto:${email}`;
  mailLink.textContent = email;
  const webLink = document.getElementById("contact-web");
  webLink.href = web;
  webLink.textContent = S.contact.websiteLabel;
  document.getElementById("contact-office").innerHTML = `${S.contact.office}<br>${S.contact.poBox}`;
  document.getElementById("contact-aum-label").textContent = S.contact.aumLabel;
  document.getElementById("contact-aum").innerHTML = S.contact.aum
    .map((x, i) => `${i + 1}. ${x}`)
    .join("<br>");
  const cMail = document.getElementById("closing-mail");
  cMail.href = `mailto:${email}`;
  cMail.textContent = email;
  const cWeb = document.getElementById("closing-web");
  cWeb.href = web;
  cWeb.textContent = S.contact.websiteLabel;

  document.getElementById("footer-rights").textContent = S.footer.rights;
  document.getElementById("footer-attr").textContent = S.footer.attribution;

  // Form interests
  document.getElementById("interest-checks").innerHTML = S.form.interests
    .map(
      (label, i) =>
        `<label><input type="checkbox" name="interest" value="${label}" /> ${label}</label>`
    )
    .join("");

  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.textContent =
      "Demo only — your enquiry was captured locally and is not sent yet. A future CMS will handle delivery.";
    status.classList.add("show");
    form.reset();
  });
})();
