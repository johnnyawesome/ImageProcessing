/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

const canvasWidth = 450;
const canvasHeight = 607;
//Buttons
let originalImage, bw, neg, oldschool, noisy, shine;
//Image
let img;

//Make sure the Image is loaded before everything else
function preload() {
  //Special option for HD-Displays
  pixelDensity(1);
  //Load the image
  img = loadImage('../DemoImages/Fall.jpg');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight, P2D);
  //Display the image
  image(img, 0, 0);

  //Create all buttons with corresponding mousePressed-callbacks
  originalImage = createButton('Original').mousePressed(() => updateAllPixels("original"));
  shine = createButton('Shine').mousePressed(() => updateAllPixels("shine"));
  bw = createButton('BW').mousePressed(() => updateAllPixels("bw"));
  neg = createButton('Negative').mousePressed(() => updateAllPixels("negative"));
  oldschool = createButton('Retro').mousePressed(() => updateAllPixels("warhol"));
  noisy = createButton('Noise').mousePressed(() => updateAllPixels("noise"));
}

function updateAllPixels(mode) {
  //Load original Image
  img = loadImage('../DemoImages/Fall.jpg');

  //Timeout - Above loadImage()-Function needs time to load the image 
  setTimeout(() => {
    //Load all Pixels of the image
    img.loadPixels();
    //Go through every single Pixel
    for (let y = 0; y < canvasHeight; y++) {
      for (let x = 0; x < canvasWidth; x++) {
        //Index-Value of the Pixel inside Pixels-Array
        const index = (x + y * canvasWidth) * 4;

        //Shine
        if (mode === "shine") {
          img.pixels[index] = img.pixels[index] += map(x, 0, canvasWidth, 0, 128);
        } else if (mode === "bw") {
          let average = (img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2]) / 3;
          img.pixels[index] = average;
          img.pixels[index + 1] = average;
          img.pixels[index + 2] = average;
          //Invert Pixels
        } else if (mode === "negative") {
          img.pixels[index] = map(img.pixels[index], 0, 255, 255, 0);
          img.pixels[index + 1] = map(img.pixels[index + 1], 0, 255, 255, 0);
          img.pixels[index + 2] = map(img.pixels[index + 2], 0, 255, 255, 0);
          //This is Art!
        } else if (mode === "warhol") {
          img.pixels[index] = map(img.pixels[index], 0, 255, 255, 0);
          //Add some Noise
        } else if (mode === "noise") {
          img.pixels[index] = map(img.pixels[index], 0, 255 + random(-100, 100), 0, 255);
          img.pixels[index + 1] = map(img.pixels[index + 1], 0, 255 + random(-100, 100), 0, 255);
          img.pixels[index + 2] = map(img.pixels[index + 2], 0, 255 + random(-100, 100), 0, 255);
        }
      }
    }
    //Update all Pixels of the image
    img.updatePixels();
    //Display the new image
    image(img, 0, 0);
  }, 250);
}

function draw() {
}