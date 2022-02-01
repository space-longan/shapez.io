// @ts-nocheck
const METADATA = {
    website: "https://tobspr.io",
    author: "tobspr",
    name: "Mod Example: Mirrored Cutter Variant",
    version: "1",
    id: "mirrored-cutter",
    description: "Shows how to add new variants to existing buildings",
    minimumGameVersion: ">=1.5.0",
};

class Mod extends shapez.Mod {
    init() {
        shapez.enumCutterVariants.mirrored = "mirrored";

        this.modInterface.addVariantToExistingBuilding(
            shapez.MetaCutterBuilding,
            shapez.enumCutterVariants.mirrored,
            {
                name: "Cutter (Mirrored)",
                description: "A mirrored cutter",

                tutorialImageBase64: RESOURCES["cutter-mirrored.png"],
                regularSpriteBase64: RESOURCES["cutter-mirrored.png"],
                blueprintSpriteBase64: RESOURCES["cutter-mirrored.png"],

                dimensions: new shapez.Vector(2, 1),

                additionalStatistics(root) {
                    const speed = root.hubGoals.getProcessorBaseSpeed(shapez.enumItemProcessorTypes.cutter);
                    return [
                        [
                            shapez.T.ingame.buildingPlacement.infoTexts.speed,
                            shapez.formatItemsPerSecond(speed),
                        ],
                    ];
                },

                isUnlocked(root) {
                    return true;
                },
            }
        );

        // Extend instance methods
        this.modInterface.extendClass(shapez.MetaCutterBuilding, ({ $old }) => ({
            updateVariants(entity, rotationVariant, variant) {
                if (variant === shapez.enumCutterVariants.mirrored) {
                    entity.components.ItemEjector.setSlots([
                        { pos: new shapez.Vector(0, 0), direction: shapez.enumDirection.top },
                        { pos: new shapez.Vector(1, 0), direction: shapez.enumDirection.top },
                    ]);
                    entity.components.ItemProcessor.type = shapez.enumItemProcessorTypes.cutter;
                    entity.components.ItemAcceptor.setSlots([
                        {
                            pos: new shapez.Vector(1, 0),
                            direction: shapez.enumDirection.bottom,
                            filter: "shape",
                        },
                    ]);
                } else {
                    // Since we are changing the ItemAcceptor slots, we should reset
                    // it to the regular slots when we are not using our mirrored variant
                    entity.components.ItemAcceptor.setSlots([
                        {
                            pos: new shapez.Vector(0, 0),
                            direction: shapez.enumDirection.bottom,
                            filter: "shape",
                        },
                    ]);
                    $old.updateVariants.bind(this)(entity, rotationVariant, variant);
                }
            },
        }));
    }
}

const RESOURCES = {
    "cutter-mirrored.png":
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAADACAYAAAAN6LRnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4VpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDcuMS1jMDAwIDc5LmRhYmFjYmIsIDIwMjEvMDQvMTQtMDA6Mzk6NDQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NGQwZTY5MmYtOTRlNy00MDQyLWFjY2ItNmU3OGEzMGU1N2ZjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwOTY4MzA0N0I4QTExRUNCQzRERjNBOEI5ODYyRkJBIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwOTY4MzAzN0I4QTExRUNCQzRERjNBOEI5ODYyRkJBIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmRmNmU1ODFjLTQ3ZDItYzE0OS05MmQzLWRhZDMyMTg5YTA3MiIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjk3MDYxZWYyLTY2ZGMtZjI0Zi1iZTMy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",
};