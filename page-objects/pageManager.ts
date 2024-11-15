import { Page } from '@playwright/test';
import { CreateNewProject } from './createNewProject';
import { NoProjectSelected } from './noProjectSelected';
import { ProjectDetails } from './projectDetails';
import { SidebarMenu } from './sidebarMenu';

export class PageManager {
    private readonly page: Page;
    readonly sidebarMenu: SidebarMenu;
    readonly noProjectSelected: NoProjectSelected;
    readonly createNewProject: CreateNewProject;
    readonly projectDetails: ProjectDetails;

    constructor(page: Page) {
        this.page = page;
        this.sidebarMenu = new SidebarMenu(this.page);
        this.noProjectSelected = new NoProjectSelected(this.page);
        this.createNewProject = new CreateNewProject(this.page);
        this.projectDetails = new ProjectDetails(this.page);
    }

    get onSidebarMenu() {
        return this.sidebarMenu;
    }

    get onNoProjectSelectedPage() {
        return this.noProjectSelected;
    }

    get onCreateNewProjectPage() {
        return this.createNewProject;
    }

    get onProjectDetailsPage() {
        return this.projectDetails;
    }
}