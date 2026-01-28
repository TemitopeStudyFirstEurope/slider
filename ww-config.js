export default {
  editor: {
    label: {
      en: "Slider Dropdown",
    },
  },
  properties: {
    // Placeholder Text
    placeholderText: {
      label: {
        en: "Placeholder Text",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "Select a value",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Placeholder text shown when no value is selected",
      },
      /* wwEditor:end */
    },

    // Label
    label: {
      label: {
        en: "Label",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "Price per lesson",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Label text displayed above the value",
      },
      /* wwEditor:end */
    },

    // Currency Symbol
    currencySymbol: {
      label: {
        en: "Prefix",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "€",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Prefix symbol (€, $, £, etc.)",
      },
      /* wwEditor:end */
    },

    // Suffix
    suffix: {
      label: {
        en: "Suffix",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Suffix text (e.g., '/hr', '+', etc.)",
      },
      propertyHelp: "Optional suffix like '+' or '/hr' to show after the value",
      /* wwEditor:end */
    },

    // Range Configuration
    minValue: {
      label: {
        en: "Minimum Value",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 20,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Minimum value of the slider",
      },
      /* wwEditor:end */
    },

    maxValue: {
      label: {
        en: "Maximum Value",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 1000,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Maximum value of the slider",
      },
      /* wwEditor:end */
    },

    step: {
      label: {
        en: "Step (Increment per Slide)",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: 10,
      min: 0.01,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "How much the slider increments per step",
      },
      propertyHelp: "The amount the slider value changes with each movement",
      /* wwEditor:end */
    },

    // Initial Value
    initialValue: {
      label: {
        en: "Initial Value",
      },
      type: "Number",
      section: "settings",
      bindable: true,
      defaultValue: null,
      /* wwEditor:start */
      bindingValidation: {
        type: "number",
        tooltip: "Initial selected value (leave empty for no initial value)",
      },
      propertyHelp: "Leave empty to show placeholder, or set a default value",
      /* wwEditor:end */
    },

    // Initially Expanded
    initiallyExpanded: {
      label: {
        en: "Initially Expanded",
      },
      type: "OnOff",
      section: "settings",
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Whether the dropdown is expanded by default",
      },
      /* wwEditor:end */
    },

    // Styling
    borderColor: {
      label: {
        en: "Border Color",
      },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#007AFF",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Border color for the dropdown",
      },
      /* wwEditor:end */
    },

    backgroundColor: {
      label: {
        en: "Background Color",
      },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#FFFFFF",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Background color",
      },
      /* wwEditor:end */
    },

    textColor: {
      label: {
        en: "Text Color",
      },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#000000",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Text color",
      },
      /* wwEditor:end */
    },

    sliderColor: {
      label: {
        en: "Slider Color",
      },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#000000",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Color of the slider track and handle",
      },
      /* wwEditor:end */
    },

    borderRadius: {
      label: {
        en: "Border Radius",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "12px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Border radius for the dropdown",
      },
      /* wwEditor:end */
    },

    borderWidth: {
      label: {
        en: "Border Width",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "2px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Border width for the dropdown",
      },
      /* wwEditor:end */
    },

    headerPaddingVertical: {
      label: {
        en: "Header Vertical Padding",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "16px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Vertical padding inside the header (controls height)",
      },
      propertyHelp: "Reduce this value to make the input shorter",
      /* wwEditor:end */
    },

    headerPaddingHorizontal: {
      label: {
        en: "Header Horizontal Padding",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "20px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Horizontal padding inside the header (controls width spacing)",
      },
      propertyHelp: "Reduce this value to make the input narrower",
      /* wwEditor:end */
    },

    labelFontSize: {
      label: {
        en: "Label Font Size",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "14px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Font size for the label text",
      },
      /* wwEditor:end */
    },

    valueFontSize: {
      label: {
        en: "Value Font Size",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "20px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Font size for the range/value display",
      },
      /* wwEditor:end */
    },

    chevronSize: {
      label: {
        en: "Chevron Size",
      },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "20px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Size of the dropdown chevron icon",
      },
      /* wwEditor:end */
    },
  },
  triggerEvents: [
    {
      name: "value-change",
      label: { en: "On value change" },
      event: {
        value: 0,
      },
    },
    {
      name: "dropdown-toggle",
      label: { en: "On dropdown toggle" },
      event: {
        isExpanded: false,
      },
    },
  ],
};
