import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-own-button',
  standalone: false,
  templateUrl: './own-button.html',
  styleUrl: './own-button.scss',
})
export class OwnButton {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: 'success' | 'primary' | 'danger' | 'light' | 'cancel' | 'sky' | "white" | "mezclado" | 'transparente' | 'transparenteCancel' | "bordeado" | "none" = 'primary';
  @Input() style = {};

  mapColors = {
    success: {
      'bg-success-700': true,
      'hover:bg-success-800': true,
      'focus:ring-success-300': true,
      'text-white': true,
    },
    primary: {
      'bg-[var(--color-button-primario)]': true,
      'border': true,
      'border-[var(--color-button-primario)]': true,
      'hover:bg-sky-800': true,
      'focus:ring-primary-300': true,
      'text-white': true,
    },
    danger: {
      'bg-red-500': true,
      'hover:bg-red-700': true,
      'focus:ring-red-300': true,
      'text-white': true,
    },
    light: {
      'bg-gray-200': true,
      'hover:bg-gray-500': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true,
    },
    cancel: {
      'bg-gray-200': true,
      'hover:bg-gray-300': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true,
    },
    white: {
      'bg-white': true,
      'hover:bg-gray-100': true,
      'ring-gray-50': true,
      'text-gray-700': true,
      'border': true,
      'border-[var(--color-black-alt)]': true
    },
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'focus:ring-sky-300': true,
      'text-white': true,
    },
    mezclado: {
      'bg-mezclado': true,
      'text-white': true,
    },
    transparente: {
      'bg-transparent': true,
      'text-Name': true,
      'border-[var(--color-primario)]': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-500': true,
      'focus:ring-gray-500': true,
    },
    transparenteCancel: {
      'bg-transparent': true,
      'text-red-500': true,
      'border-red-500': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-100': true,
      'focus:ring-gray-100': true,
    },
    bordeado: {
      'bg-white': true,
      'text-[var(--color-black-alt)]': true,
      'border-[var(--color-primario)]': true,
      'border-[0.0125rem]': true,
      'hover:bg-gray-300': true,
      'focus:ring-gray-500': true,
    },
    none:{}
  };

  constructor() {}

  get colors() {
    let colors = this.mapColors[this.color];
    if (this.color != "none") {
      if (colors) {
        colors = {...colors,...this.style}
        if(this.disabled) colors = {...colors, ...{'opacity-50': true, '!cursor-not-allowed': true}};
        return colors;
      }
    }
    return this.style;
  }
}
