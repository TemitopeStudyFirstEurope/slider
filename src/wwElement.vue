<template>
  <div class="slider-dropdown" :style="componentStyle">
    <!-- Header (collapsed view) -->
    <div class="dropdown-header" @click="toggleDropdown">
      <div class="header-content">
        <div class="label">{{ props.content?.label || 'Label' }}</div>
        <div class="range-display">
          {{ formatValue(minRange) }} – {{ formatValue(maxRange) }}
        </div>
      </div>
      <div class="chevron-icon" :class="{ expanded: isExpanded }">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

    <!-- Expanded Content -->
    <div v-if="isExpanded" class="dropdown-content">
      <div class="value-display-large">
        {{ displayValue }}
      </div>

      <!-- Single Value Slider -->
      <div class="slider-container" ref="sliderContainerRef">
        <div class="slider-track">
          <div class="slider-fill" :style="sliderFillStyle"></div>
        </div>

        <!-- Single Handle -->
        <div
          class="slider-handle"
          :style="handleStyle"
          @mousedown="startDrag($event)"
          @touchstart="startDrag($event)"
        >
          <div class="handle-inner"></div>
        </div>
      </div>

      <!-- Min/Max Labels -->
      <div class="slider-labels">
        <span class="min-label">{{ formatValue(minRange) }}</span>
        <span class="max-label">{{ formatValue(maxRange) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Internal state
    const isExpanded = ref(props.content?.initiallyExpanded || false);
    const sliderContainerRef = ref(null);
    const isDragging = ref(false);

    // Internal variable for NoCode users
    const { value: currentValue, setValue: setCurrentValue } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'value',
      type: 'number',
      defaultValue: null,
    });

    const { value: isDropdownExpanded, setValue: setIsDropdownExpanded } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'isExpanded',
      type: 'boolean',
      defaultValue: props.content?.initiallyExpanded || false,
    });

    // Watch for initial value changes
    watch(() => props.content?.initialValue, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        // Clamp the initial value to min/max range
        const min = props.content?.minValue ?? 20;
        const max = props.content?.maxValue ?? 1000;
        const clampedValue = Math.max(min, Math.min(max, newValue));
        setCurrentValue(clampedValue);
      }
    }, { immediate: true });

    watch(() => props.content?.initiallyExpanded, (newValue) => {
      if (newValue !== undefined && newValue !== null) {
        isExpanded.value = newValue;
        setIsDropdownExpanded(newValue);
      }
    });

    // Computed properties
    const minRange = computed(() => props.content?.minValue ?? 20);
    const maxRange = computed(() => props.content?.maxValue ?? 1000);
    const step = computed(() => props.content?.step ?? 10);
    const hasValue = computed(() => currentValue.value !== null && currentValue.value !== undefined);

    const componentStyle = computed(() => ({
      '--border-color': props.content?.borderColor || '#007AFF',
      '--background-color': props.content?.backgroundColor || '#FFFFFF',
      '--text-color': props.content?.textColor || '#000000',
      '--slider-color': props.content?.sliderColor || '#000000',
      '--border-radius': props.content?.borderRadius || '12px',
    }));

    const valuePercentage = computed(() => {
      if (!hasValue.value) return 0;
      const range = maxRange.value - minRange.value;
      return range > 0 ? ((currentValue.value - minRange.value) / range) * 100 : 0;
    });

    const sliderFillStyle = computed(() => ({
      width: `${valuePercentage.value}%`,
    }));

    const handleStyle = computed(() => ({
      left: `${valuePercentage.value}%`,
    }));

    const displayValue = computed(() => {
      if (!hasValue.value) {
        return props.content?.placeholderText || 'Select a value';
      }
      return formatValue(currentValue.value);
    });

    // Methods
    const formatValue = (value) => {
      const prefix = props.content?.currencySymbol || '';
      const suffix = props.content?.suffix || '';
      return `${prefix}${value}${suffix}`;
    };

    const toggleDropdown = () => {
      isExpanded.value = !isExpanded.value;
      setIsDropdownExpanded(isExpanded.value);

      emit('trigger-event', {
        name: 'dropdown-toggle',
        event: { isExpanded: isExpanded.value },
      });
    };

    const clampValue = (value) => {
      const rounded = Math.round(value / step.value) * step.value;
      return Math.max(minRange.value, Math.min(maxRange.value, rounded));
    };

    const updateValue = (clientX) => {
      if (!sliderContainerRef.value) return;

      const rect = sliderContainerRef.value.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const range = maxRange.value - minRange.value;
      const rawValue = minRange.value + (percentage * range);
      const value = clampValue(rawValue);

      if (value !== currentValue.value) {
        setCurrentValue(value);
        emit('trigger-event', {
          name: 'value-change',
          event: { value: value },
        });
      }
    };

    const startDrag = (event) => {
      event.preventDefault();
      isDragging.value = true;

      const handleMove = (e) => {
        if (!isDragging.value) return;
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        if (clientX) {
          updateValue(clientX);
        }
      };

      const handleEnd = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    };

    // Watch for all props that affect rendering
    watch(() => [
      props.content?.label,
      props.content?.placeholderText,
      props.content?.currencySymbol,
      props.content?.suffix,
      props.content?.minValue,
      props.content?.maxValue,
      props.content?.step,
      props.content?.borderColor,
      props.content?.backgroundColor,
      props.content?.textColor,
      props.content?.sliderColor,
      props.content?.borderRadius,
    ], () => {
      // Reactivity handled by computed properties
    }, { deep: true });

    return {
      props,
      isExpanded,
      sliderContainerRef,
      currentValue,
      hasValue,
      componentStyle,
      sliderFillStyle,
      handleStyle,
      displayValue,
      minRange,
      maxRange,
      formatValue,
      toggleDropdown,
      startDrag,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider-dropdown {
  width: 100%;
  background: var(--background-color);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

.header-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.7;
}

.range-display {
  font-size: 20px;
  font-weight: 600;
}

.chevron-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: transform 0.3s ease;

  &.expanded {
    transform: rotate(180deg);
  }
}

.dropdown-content {
  padding: 24px 32px 32px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.value-display-large {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 40px;
  padding: 16px 0;
  cursor: pointer;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-50%);
}

.slider-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--slider-color);
  transition: width 0.1s ease;
}

.slider-handle {
  position: absolute;
  top: 50%;
  width: 32px;
  height: 32px;
  transform: translate(-50%, -50%);
  cursor: grab;
  z-index: 2;
  transition: left 0.1s ease;

  &:active {
    cursor: grabbing;
  }

  .handle-inner {
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    border: 3px solid var(--slider-color);
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  &:hover .handle-inner {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active .handle-inner {
    transform: scale(1.05);
  }
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 13px;
  opacity: 0.6;
}

.min-label,
.max-label {
  font-weight: 500;
}

// Responsive design
@media (max-width: 768px) {
  .dropdown-header {
    padding: 14px 16px;
  }

  .label {
    font-size: 13px;
  }

  .range-display {
    font-size: 18px;
  }

  .dropdown-content {
    padding: 20px 24px 28px;
  }

  .value-display-large {
    font-size: 24px;
    margin-bottom: 28px;
  }

  .slider-handle {
    width: 36px;
    height: 36px;
  }

  .slider-labels {
    font-size: 12px;
  }
}
</style>
