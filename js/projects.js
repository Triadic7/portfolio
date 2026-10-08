// Load projects from JSON file.
async function loadProjects() {
    const response = await fetch("data/projects.json");
    const projects = await response.json();

    // Get the project grid and sidebar navigation.
    const projectGrid = document.getElementById("project-grid");
    const projectLinks = document.getElementById("project-links");

    // Loop through each project.
    projects.forEach(project => {

        // Create the sidebar navigation link.
        const projectLink = document.createElement("a");

        projectLink.href = `project.html?id=${project.slug}`;
        projectLink.textContent = project.name;

        projectLinks.appendChild(projectLink);


        // Create the project card.
        const card = document.createElement("article");

        card.classList.add("project-card");


        // Make the entire project card clickable.
        card.addEventListener("click", () => {
            window.location.href = `project.html?id=${project.slug}`;
        });


        // Get the first image or use a placeholder.
        const image = project.images.length > 0
            ? project.images[0]
            : "https://placehold.co/600x338";


        // Create the project image.
        const projectImage = document.createElement("div");

        projectImage.classList.add("project-image");


        const img = document.createElement("img");

        img.src = image;
        img.alt = project.name;


        projectImage.appendChild(img);


        // Create the project content.
        const projectContent = document.createElement("div");

        projectContent.classList.add("project-content");


        // Create the project title.
        const title = document.createElement("h3");

        title.textContent = project.name;


        // Create the brief description.
        const description = document.createElement("p");

        description.textContent = project.briefDescription;


        // Add the title and description to the content.
        projectContent.appendChild(title);
        projectContent.appendChild(description);


        // Add the image and content to the card.
        card.appendChild(projectImage);
        card.appendChild(projectContent);


        // Add the card to the project grid.
        projectGrid.appendChild(card);
    });
}


// Load the projects when the page loads.
loadProjects();