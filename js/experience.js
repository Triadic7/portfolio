let experiences = [];

let selectedCategory = "All";

/**
 * Gets the selected category from the URL.
 */
function loadSelectedCategory() {

    const params = new URLSearchParams(
        window.location.search
    );

    const category = params.get("category");

    if (category) {
        selectedCategory = category;
    }
}

/**
 * Loads experience data from experiences.json.
 */
async function loadExperiences() {

    try {

        // Fetch experiences data from JSON file.
        const response = await fetch("data/experiences.json");

        if (!response.ok) {
            throw new Error("Failed to load experiences.");
        }

        // Parse JSON data.
        experiences = await response.json();
        loadSelectedCategory();

        // Check if experiences array is empty.
        if (!experiences.length) {

            showMessage(
                "No Experiences Found",
                "There are currently no experiences to display."
            );

            return;
        }

        // Create the filter buttons.
        createFilterButtons();

        // Display all experiences.
        displayExperiences();

        // Create the experience navigation links.
        loadExperienceLinks();

    } catch (error) {

        // Log error to console.
        console.error(error);

        // Display error message.
        showMessage(
            "Unable to Load Experiences",
            "There was a problem loading the experience data."
        );
    }
}

/**
 * Creates the experience category filter buttons.
 */
function createFilterButtons() {

    const filterButtons =
        document.getElementById("filter-buttons");

    filterButtons.innerHTML = "";

    // Create the All button.
    createFilterButton(
        filterButtons,
        "All"
    );

    // Get all unique categories.
    const categories = [
        ...new Set(
            experiences.flatMap(
                experience => experience.categories || []
            )
        )
    ];

    // Sort categories alphabetically.
    categories.sort((a, b) => a.localeCompare(b));

    // Create a button for each category.
    categories.forEach(category => {

        createFilterButton(
            filterButtons,
            category
        );

    });
}

/**
 * Creates an individual filter button.
 */
function createFilterButton(container, category) {

    const button = document.createElement("button");

    button.type = "button";
    button.textContent = category;

    if (category === selectedCategory) {
        button.classList.add("active");
    }

    button.addEventListener("click", () => {

        selectedCategory = category;

        updateFilterButtons();

        displayExperiences();

    });

    container.appendChild(button);
}

/**
 * Updates the active filter button.
 */
function updateFilterButtons() {

    const buttons =
        document.querySelectorAll(
            "#filter-buttons button"
        );

    buttons.forEach(button => {

        button.classList.toggle(
            "active",
            button.textContent === selectedCategory
        );

    });
}

/**
 * Displays experiences based on the selected category.
 */
function displayExperiences() {

    const experienceGrid =
        document.getElementById("experience-grid");

    experienceGrid.innerHTML = "";

    // Filter experiences.
    const filteredExperiences =
        selectedCategory === "All"
            ? experiences
            : experiences.filter(
                experience =>
                    experience.categories &&
                    experience.categories.includes(
                        selectedCategory
                    )
            );

    // Display a message if nothing matches.
    if (!filteredExperiences.length) {

        showMessage(
            "No Experiences Found",
            "There are no experiences in this category."
        );

        return;
    }

    // Create a card for each experience.
    filteredExperiences.forEach(experience => {

        const card = createExperienceCard(experience);

        experienceGrid.appendChild(card);

    });
}

/**
 * Creates an experience card.
 */
function createExperienceCard(experience) {

    // Create card element.
    const card = document.createElement("article");
    card.className = "curved-box experience-card";
    card.id = `experience-${experience.id}`;

    // Create icon element.
    const icon = document.createElement("img");
    icon.className = "experience-icon";
    icon.src = experience.icon;
    icon.alt = `${experience.name} icon`;

    // Create name element.
    const name = document.createElement("h2");
    name.textContent = experience.name;

    // Create details element.
    const details = document.createElement("div");
    details.className = "experience-details";

    // Create when element.
    const when = createDetail(
        experience,
        "when",
        "When"
    );

    // Create why element.
    const why = createDetail(
        experience,
        "why",
        "Why"
    );

    // Add details.
    details.appendChild(when);
    details.appendChild(why);

    // Create experience summary.
    const experienceSection =
        document.createElement("div");

    experienceSection.className =
        "experience-summary";

    experienceSection.id =
        `experience-${experience.id}-experience`;

    // Create experience title.
    const experienceTitle =
        document.createElement("h3");

    experienceTitle.textContent =
        "Experience";

    // Create experience text.
    const experienceText =
        document.createElement("p");

    experienceText.textContent =
        experience.experience;

    experienceSection.appendChild(
        experienceTitle
    );

    experienceSection.appendChild(
        experienceText
    );

    // Append everything to the card.
    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(details);
    card.appendChild(experienceSection);

    return card;
}

/**
 * Creates a When or Why detail section.
 */
function createDetail(experience, property, title) {

    const detail =
        document.createElement("div");

    detail.className =
        "experience-detail";

    detail.id =
        `experience-${experience.id}-${property}`;

    const detailTitle =
        document.createElement("h3");

    detailTitle.textContent = title;

    const detailText =
        document.createElement("p");

    detailText.textContent =
        experience[property];

    detail.appendChild(detailTitle);
    detail.appendChild(detailText);

    return detail;
}

/**
 * Creates experience links in the sidebar.
 */
function loadExperienceLinks() {

    const experienceBox =
        document.getElementById("experience-box");

    const navLinks =
        experienceBox.querySelector(".nav-links");

    navLinks.innerHTML = "";

    // Sort experiences alphabetically.
    const sortedExperiences =
        [...experiences].sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    // Create a link for each experience.
    sortedExperiences.forEach(experience => {

        const link =
            document.createElement("a");

        link.href =
            `#experience-${experience.id}`;

        link.textContent =
            experience.name;

        navLinks.appendChild(link);

    });
}

/**
 * Displays a message in the experience grid.
 */
function showMessage(titleText, messageText) {

    const experienceGrid =
        document.getElementById("experience-grid");

    experienceGrid.innerHTML = "";

    const empty =
        document.createElement("div");

    empty.className =
        "curved-box experience-empty";

    const title =
        document.createElement("h2");

    title.textContent = titleText;

    const text =
        document.createElement("p");

    text.textContent = messageText;

    empty.appendChild(title);
    empty.appendChild(text);

    experienceGrid.appendChild(empty);
}

loadExperiences();