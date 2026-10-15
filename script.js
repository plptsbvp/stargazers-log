const status = document.querySelector("#status");
const repositoryList = document.querySelector("#repositories");

function renderRepositories(events) {
  if (!Array.isArray(events)) {
    throw new Error("The repository data must be a list.");
  }

  if (events.length === 0) {
    status.textContent = "No starred repositories yet.";
    return;
  }

  const fragment = document.createDocumentFragment();

  events.forEach((event) => {
    const item = document.createElement("li");
    item.className = "repository-card";

    const link = document.createElement("a");
    link.href = event.url;
    link.textContent = event.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const description = document.createElement("p");
    description.textContent = event.description;

    const date = document.createElement("time");
    date.dateTime = event.starred_at;
    date.textContent = `Starred on ${event.starred_at}`;

    item.append(link, description, date);
    fragment.append(item);
  });

  repositoryList.append(fragment);
  status.textContent = `${events.length} starred ${events.length === 1 ? "repository" : "repositories"}.`;
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}.`);
    }

    return response.json();
  })
  .then(renderRepositories)
  .catch((error) => {
    status.textContent = "Could not load starred repositories. Please try again later.";
    console.error("Failed to load events.json:", error);
  });
