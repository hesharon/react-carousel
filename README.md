# React Carousel

Simple React carousel using React Hooks. 

- Lightweight
- No external libraries
- Responsive
- Swipable on mobile
- Has bullet pagination
- Infinite scrolling, but I laid out the code for no infinite scrolling in components > carousel > index.js if you like

Go ahead and use the code for the carousel and edit it however you need for your use case. I put it here for my own purpose and for the community because it took me awhile to create this lightweight custom component. External libraries just contain too many features that I didn't need and makes it hard to work with.

Note: The photos I'm using are just huge to load, that's why there's a split second of a white slide for some images

https://user-images.githubusercontent.com/36219316/113464331-95326f80-93e0-11eb-85b9-bc8d0490eb14.mov

https://user-images.githubusercontent.com/36219316/113464306-716f2980-93e0-11eb-8768-61e88e100358.mov


## How the Carousel works
- Putting the images side by side
- Defining a div of fixed length that is the same width as the images
- Setting the div with overflow: hidden
- Creating event listeners (touch and click) that will translate the div in the X axis by (index * imgWidth)

### Infinite Scrolling
Infinite carousel works on top of the above.

Lets say we have an Array = [1, 2, 3]. Each element is an image. But lets start off the array being [3, 1, 2, 3] and the current index = 1. I'll explain why later.

Going forward
- If we're at the end of the array of images, place the first image at the end of the array. 
[3, 1, 2, 3 (current)] ----> [3, 1, 2, 3 (current), 1]

- If we're at the extra image at the end of the array (the first image we added to the end of the array), reset the array and the index to 1.
 [3, 1, 2, 3, 1 (current)] ---> [3, 1 (current), 2, 3]

Going backwards
Going backwards is a bit different. If we started off with the array being [1, 2, 3] and current index being 0, there is nothing before Array[0] that we can go to. That is why we started off with the array being [3, 1, 2, 3] and our current index 1.

- If we're at index 0, reset the array so that the first element of the original array is at the end, and the last element of the original array is at the beginning. Set current index to the last index of the original array
[3 (current), 1, 2, 3] ----> [3, 1, 2, 3 (current), 1]
