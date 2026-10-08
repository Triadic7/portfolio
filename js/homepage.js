// Load featured projects from the JSON file.
async function loadHomepageProjects() {

    // Load the projects.
    const response = await fetch("data/projects.json");
    const projects = await response.json();


    // Get the project grid.
    const projectGrid = document.getElementById("homepage-project-grid");


    // Get projects marked as featured.
    const featuredProjects = projects.filter(
        project => project.featured === true
    );


    // Show the first two featured projects.
    featuredProjects.slice(0, 2).forEach(project => {

        // Create the project card.
        const card = document.createElement("article");

        card.classList.add("project-card");


        // Make the card clickable.
        card.addEventListener("click", () => {

            window.location.href =
                `project.html?id=${project.slug}`;

        });


        // Create the image container.
        const projectImage = document.createElement("div");

        projectImage.classList.add("project-image");


        // Create the image.
        const image = document.createElement("img");

        image.src = project.images[0];

        image.alt = project.name;


        projectImage.appendChild(image);


        // Add an award badge if the project has one.
        if (project.award) {

            const award = document.createElement("div");

            award.classList.add("project-award");

            award.textContent =
                `★ ${project.award}`;

            projectImage.appendChild(award);
        }


        // Create the project content.
        const projectContent = document.createElement("div");

        projectContent.classList.add("project-content");


        // Create the project title.
        const title = document.createElement("h3");

        title.textContent = project.name;


        // Create the project description.
        const description = document.createElement("p");

        description.textContent = project.briefDescription;


        // Add the content.
        projectContent.appendChild(title);

        projectContent.appendChild(description);


        // Add everything to the card.
        card.appendChild(projectImage);

        card.appendChild(projectContent);


        // Add the card to the page.
        projectGrid.appendChild(card);
    });
}


// Load the projects when the page loads.
loadHomepageProjects();