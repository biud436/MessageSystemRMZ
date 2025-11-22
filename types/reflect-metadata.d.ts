// Global augmentation for Reflect Metadata API
import "reflect-metadata";

declare global {
  namespace Reflect {
    function getMetadata(metadataKey: any, target: object): any;
    function defineMetadata(
      metadataKey: any,
      metadataValue: any,
      target: object
    ): void;
  }
}

export {};
