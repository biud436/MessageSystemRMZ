import Container, { Service } from "typedi";
import { Component } from "../core/component2";

@Service()
export class MetadataStorage {
  private components: Component[] = [];

  addComponent(component: Component) {
    if (!this.components) {
      this.components = [];
    }

    this.components.push(component);
  }
}

export function getMetadataStorage() {
  return Container.get(MetadataStorage);
}
