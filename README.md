# vue-cropperjs

> a vue component wrapper for cropperjs. https://morepainmoregain.github.io/vue-cropper-image/

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
## Usage

```
import cropper from 'vue-cropper-image';

<cropper :src='src' :aspectRatio="16/9" :show="true"/>
```
## Options
Most options of [cropperjs](https://github.com/fengyuanchen/cropperjs) is supported.
Some component options as follow:

#### src
  - type: String
  - default: NaN
  Define the path of image that need to be cropped.
> **[Notice]** Once the value of the src changing, the cropper wrapper will be show

## Methods

#### croped
  - params: canvas
  when pressing yes btn ,it will dispatch this event.it return the result of `cropper.getCroppedCanvas()` as it's params.
TODO:
- support choose local image file
- support xhr upload

## Support
pc and H5 website

