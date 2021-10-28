import { createFeatureSelector } from "@ngrx/store";
import { ProjectState } from "src/app/shared/state";

export const getProjects = createFeatureSelector<ProjectState>('projects');