// Load the selected project from the JSON file.
async function loadProject() {

    // Get the project ID from the URL.
    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get("id");


    // Get the main project page.
    const projectPage = document.getElementById("project-page");


    // Get the project navigation.
    const projectLinks = document.getElementById("project-section-links");


    // Stop if no project was specified.
    if (!projectSlug) {
        showProjectError("No project was specified.");
        return;
    }


    // Load the projects from the JSON file.
    const response = await fetch("data/projects.json");
    const projects = await response.json();


    // Find the selected project.
    const project = projects.find(
        project => project.slug === projectSlug
    );


    // Stop if the project does not exist.
    if (!project) {
        showProjectError("Project not found.");
        return;
    }


    // Update the browser title.
    document.title = `${project.name} | Portfolio`;


    // Update the project navigation title.
    const projectNavTitle = document.getElementById("project-nav-title");

    projectNavTitle.textContent = project.name;


    // Create the project title.
    const title = document.createElement("h1");

    title.textContent = project.name;

    projectPage.appendChild(title);


    // Add the image carousel.
    if (project.images && project.images.length > 0) {

        const section = document.createElement("section");

        section.classList.add("project-section");
        section.id = "gallery";


        const heading = document.createElement("h2");

        heading.textContent = "Gallery";

        section.appendChild(heading);


        const carousel = createCarousel(
            project.name,
            project.images
        );

        section.appendChild(carousel);

        projectPage.appendChild(section);


        addNavigationLink(
            projectLinks,
            "gallery",
            "Gallery"
        );
    }


    // Add the full description.
    if (project.description) {

        const section = createTextSection(
            "description",
            "Description",
            project.description
        );

        projectPage.appendChild(section);


        addNavigationLink(
            projectLinks,
            "description",
            "Description"
        );
    }


    // Add initial thoughts.
    if (project.initialThoughts) {

        const section = createTextSection(
            "initial-thoughts",
            "Initial Thoughts",
            project.initialThoughts
        );

        projectPage.appendChild(section);


        addNavigationLink(
            projectLinks,
            "initial-thoughts",
            "Initial Thoughts"
        );
    }


    // Add reflection.
    if (project.reflection) {

        const section = createTextSection(
            "reflection",
            "Reflection",
            project.reflection
        );

        projectPage.appendChild(section);


        addNavigationLink(
            projectLinks,
            "reflection",
            "Reflection"
        );
    }


    // Add GitHub link.
    if (project.github) {

        const section = document.createElement("section");

        section.classList.add("project-section");
        section.id = "github";


        const heading = document.createElement("h2");

        heading.textContent = "GitHub";


        const link = document.createElement("a");

        link.href = project.github;
        link.textContent = "View project on GitHub";
        link.target = "_blank";
        link.rel = "noopener noreferrer";


        section.appendChild(heading);
        section.appendChild(link);


        projectPage.appendChild(section);


        addNavigationLink(
            projectLinks,
            "github",
            "GitHub"
        );
    }
}


// Create the project image carousel.
function createCarousel(projectName, images) {

    const carousel = document.createElement("div");

    carousel.classList.add("project-carousel");


    // Create the main image container.
    const mainContainer = document.createElement("div");

    mainContainer.classList.add("carousel-main");


    // Create the main image.
    const mainImage = document.createElement("img");

    mainImage.src = images[0];
    mainImage.alt = `${projectName} image 1`;


    mainContainer.appendChild(mainImage);


    // Create the previous button.
    const previousButton = document.createElement("button");

    previousButton.classList.add(
        "carousel-button",
        "carousel-previous"
    );

    previousButton.type = "button";
    previousButton.textContent = "‹";
    previousButton.setAttribute(
        "aria-label",
        "Previous image"
    );


    // Create the next button.
    const nextButton = document.createElement("button");

    nextButton.classList.add(
        "carousel-button",
        "carousel-next"
    );

    nextButton.type = "button";
    nextButton.textContent = "›";
    nextButton.setAttribute(
        "aria-label",
        "Next image"
    );


    // Create the image counter.
    const counter = document.createElement("div");

    counter.classList.add("carousel-counter");

    counter.textContent = `1 / ${images.length}`;


    // Add carousel controls.
    mainContainer.appendChild(previousButton);
    mainContainer.appendChild(nextButton);
    mainContainer.appendChild(counter);


    // Create the thumbnail container.
    const thumbnails = document.createElement("div");

    thumbnails.classList.add("carousel-thumbnails");


    // Keep track of the current image.
    let currentIndex = 0;


    // Update the carousel image.
    function updateCarousel(index) {

        currentIndex = index;


        mainImage.src = images[currentIndex];

        mainImage.alt =
            `${projectName} image ${currentIndex + 1}`;


        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;


        // Update the active thumbnail.
        const thumbnailElements =
            thumbnails.querySelectorAll(".carousel-thumbnail");


        thumbnailElements.forEach((thumbnail, thumbnailIndex) => {

            thumbnail.classList.toggle(
                "active",
                thumbnailIndex === currentIndex
            );

        });


        // Keep the selected thumbnail visible.
        if (thumbnailElements[currentIndex]) {

            thumbnailElements[currentIndex].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

        }
    }


    // Previous image.
    previousButton.addEventListener("click", () => {

        const previousIndex =
            (currentIndex - 1 + images.length) % images.length;

        updateCarousel(previousIndex);
    });


    // Next image.
    nextButton.addEventListener("click", () => {

        const nextIndex =
            (currentIndex + 1) % images.length;

        updateCarousel(nextIndex);
    });


    // Create the thumbnails.
    images.forEach((image, index) => {

        const thumbnail = document.createElement("img");

        thumbnail.classList.add("carousel-thumbnail");

        thumbnail.src = image;

        thumbnail.alt =
            `${projectName} thumbnail ${index + 1}`;


        // Select the image when clicked.
        thumbnail.addEventListener("click", () => {
            updateCarousel(index);
        });


        thumbnails.appendChild(thumbnail);
    });


    // Add the main image and thumbnails.
    carousel.appendChild(mainContainer);

    carousel.appendChild(thumbnails);


    // Set the first thumbnail as active.
    updateCarousel(0);


    return carousel;
}


// Create a text-based project section.
function createTextSection(id, title, content) {

    const section = document.createElement("section");

    section.classList.add("project-section");

    section.id = id;


    const heading = document.createElement("h2");

    heading.textContent = title;


    const paragraph = document.createElement("p");

    paragraph.textContent = content;


    section.appendChild(heading);

    section.appendChild(paragraph);


    return section;
}


// Create a sidebar navigation link.
function addNavigationLink(container, id, text) {

    const link = document.createElement("a");

    link.href = `#${id}`;

    link.textContent = text;


    container.appendChild(link);
}


// Display an error message.
function showProjectError(message) {

    const projectPage = document.getElementById("project-page");

    projectPage.innerHTML = "";


    const heading = document.createElement("h1");

    heading.textContent = "Project";


    const paragraph = document.createElement("p");

    paragraph.textContent = message;


    projectPage.appendChild(heading);

    projectPage.appendChild(paragraph);
}


// Load the project when the page loads.
loadProject();