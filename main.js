const siteContent = window.siteContent;

const setText = (id, value) => {
  const node = document.getElementById(id);
  if (node && typeof value === "string") {
    node.textContent = value;
  }
};

const renderBio = (paragraphs = []) => {
  const container = document.getElementById("bio-text");
  if (!container) return;

  container.innerHTML = "";

  paragraphs.forEach((paragraph) => {
    const node = document.createElement("p");
    node.innerHTML = paragraph;
    container.appendChild(node);
  });
};

const renderLinks = (links = []) => {
  const container = document.getElementById("bio-links");
  if (!container) return;

  container.innerHTML = "";

  links.forEach((link) => {
    const node = document.createElement("a");
    node.href = link.href;
    node.textContent = link.label;
    container.appendChild(node);
  });
};

const renderNews = (items = []) => {
  const container = document.getElementById("news-list");
  if (!container) return;

  container.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "news-item";

    const date = document.createElement("span");
    date.className = "news-date";
    date.textContent = item.date;

    const text = document.createElement("p");
    text.textContent = item.text;

    article.appendChild(date);
    article.appendChild(text);
    container.appendChild(article);
  });
};

const renderPublications = (items = []) => {
  const container = document.getElementById("publication-list");
  if (!container) return;

  container.innerHTML = "";

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "publication-item";

    const title = document.createElement("h3");
    title.className = "publication-title";
    title.textContent = item.title;

    const authors = document.createElement("p");
    authors.className = "publication-meta";
    authors.textContent = item.authors;

    const venue = document.createElement("p");
    venue.className = "publication-meta";
    venue.textContent = item.venue;

    article.appendChild(title);
    article.appendChild(authors);
    article.appendChild(venue);
    container.appendChild(article);
  });
};

const syncPortraitWidth = () => {
  const introSection = document.querySelector(".intro-section");
  const portraitColumn = document.querySelector(".portrait-column");
  const bioColumn = document.querySelector(".bio-column");
  const portraitFrame = document.querySelector(".portrait-frame");

  if (!introSection || !portraitColumn || !bioColumn || !portraitFrame) return;

  if (window.innerWidth <= 820) {
    portraitColumn.style.width = "";
    portraitColumn.style.flexBasis = "";
    portraitFrame.style.height = "";
    return;
  }

  const aspectRatio = siteContent?.photo?.aspectRatio || 1;
  const bioHeight = bioColumn.offsetHeight;
  const gap = 48;
  const introWidth = introSection.clientWidth;
  const maxPortraitWidth = Math.max(260, introWidth * 0.42);
  const portraitWidth = Math.min(bioHeight * aspectRatio, maxPortraitWidth);
  const textWidth = introWidth - portraitWidth - gap;

  portraitFrame.style.height = `${bioHeight}px`;

  if (textWidth < 360) {
    const adjustedPortraitWidth = Math.max(260, introWidth - gap - 360);
    portraitColumn.style.width = `${adjustedPortraitWidth}px`;
    portraitColumn.style.flexBasis = `${adjustedPortraitWidth}px`;
    return;
  }

  portraitColumn.style.width = `${portraitWidth}px`;
  portraitColumn.style.flexBasis = `${portraitWidth}px`;
};

if (siteContent) {
  document.title = siteContent.pageTitle;

  setText("site-brand", siteContent.name);
  setText("nav-biography", siteContent.navigation.biography);
  setText("nav-news", siteContent.navigation.news);
  setText("person-role", siteContent.role);
  setText("news-label", siteContent.sections.newsLabel);
  setText("publications-label", siteContent.sections.publicationsLabel);
  setText("footer-name", siteContent.name);

  const portraitImage = document.getElementById("portrait-image");
  if (portraitImage) {
    portraitImage.src = siteContent.photo.src;
    portraitImage.alt = siteContent.photo.alt;
    portraitImage.addEventListener("load", syncPortraitWidth);
  }

  renderBio(siteContent.biography);
  renderLinks(siteContent.links);
  renderNews(siteContent.news);
  renderPublications(siteContent.publications);
}

setText("current-year", String(new Date().getFullYear()));

window.addEventListener("load", syncPortraitWidth);
window.addEventListener("resize", syncPortraitWidth);

const bioColumn = document.querySelector(".bio-column");
if (bioColumn && typeof ResizeObserver !== "undefined") {
  const observer = new ResizeObserver(() => {
    syncPortraitWidth();
  });
  observer.observe(bioColumn);
}
