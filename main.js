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

const getLinkIcon = (iconName) => {
  const icons = {
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3V5zm2 2v.4l7 5.25L19 7.4V7H5zm14 10V9.9l-7 5.25-7-5.25V17h14z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.22 1.84 1.22 1.08 1.82 2.82 1.3 3.5.99.1-.76.42-1.3.76-1.59-2.67-.3-5.47-1.32-5.47-5.86 0-1.29.47-2.35 1.22-3.18-.12-.3-.53-1.5.12-3.13 0 0 1-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.29-1.2 3.29-1.2.66 1.62.25 2.82.13 3.12.76.83 1.22 1.89 1.22 3.18 0 4.56-2.8 5.56-5.48 5.85.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5z"/></svg>',
    scholar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm-7 9.18V16l7 3.82L19 16v-3.82l-7 3.82-7-3.82z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48 2.49 2.49 0 0 0 4.98 3.5zM3 9h4v12H3V9zm7 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.5 4.8 5.74V21h-4v-5.63c0-1.34-.03-3.07-1.97-3.07-1.97 0-2.27 1.45-2.27 2.97V21h-4V9z"/></svg>',
  };

  return icons[iconName] || "";
};

const renderLinks = (links = []) => {
  const container = document.getElementById("portrait-socials");
  if (!container) return;

  container.innerHTML = "";

  links.forEach((link) => {
    const node = document.createElement("a");
    node.className = `social-link social-link--${link.icon}`;
    node.href = link.href;
    node.innerHTML = getLinkIcon(link.icon);
    node.setAttribute("aria-label", link.label);
    node.title = link.label;
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
    text.innerHTML = item.text;

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

    const body = document.createElement("div");
    body.className = "publication-body";

    const copy = document.createElement("div");
    copy.className = "publication-copy";

    const header = document.createElement("div");
    header.className = "publication-header";

    const title = document.createElement("h3");
    title.className = "publication-title";
    title.textContent = item.title;

    header.appendChild(title);

    if (Array.isArray(item.links) && item.links.length > 0) {
      const linkGroup = document.createElement("div");
      linkGroup.className = "publication-links";

      item.links.forEach((link) => {
        const node = document.createElement("a");
        node.className = "publication-link";
        node.href = link.href;
        node.textContent = `[${link.label}]`;
        node.setAttribute("aria-label", `${item.title} ${link.label}`);
        linkGroup.appendChild(node);
      });

      header.appendChild(linkGroup);
    }

    const authors = document.createElement("p");
    authors.className = "publication-meta";
    authors.innerHTML = item.authors;

    const venue = document.createElement("p");
    venue.className = "publication-meta";
    venue.textContent = item.venue;

    copy.appendChild(header);
    copy.appendChild(authors);
    copy.appendChild(venue);
    body.appendChild(copy);

    if (item.thumbnailSrc) {
      const thumb = document.createElement("img");
      thumb.className = "publication-thumbnail";
      thumb.src = item.thumbnailSrc;
      thumb.alt = item.thumbnailAlt || `${item.title} thumbnail`;
      body.appendChild(thumb);
    }

    article.appendChild(body);
    container.appendChild(article);
  });
};

const syncPortraitWidth = () => {
  const portraitColumn = document.querySelector(".portrait-column");
  const portraitFrame = document.querySelector(".portrait-frame");

  if (!portraitColumn || !portraitFrame) return;

  if (window.innerWidth <= 820) {
    portraitColumn.style.width = "";
    portraitColumn.style.flexBasis = "";
    portraitFrame.style.height = "";
    return;
  }

  portraitColumn.style.width = "200px";
  portraitColumn.style.flexBasis = "200px";
  portraitFrame.style.height = "";
};

if (siteContent) {
  document.title = siteContent.pageTitle;

  setText("site-brand", siteContent.name);
  setText("nav-biography", siteContent.navigation.biography);
  setText("nav-news", siteContent.navigation.news);
  setText("news-label", siteContent.sections.newsLabel);
  setText("publications-label", siteContent.sections.publicationsLabel);
  setText("footer-name", siteContent.footerName || siteContent.name);

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
