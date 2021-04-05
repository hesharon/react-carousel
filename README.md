# React Carousel

Simple React carousel using React Hooks. 

- Lightweight
- No external libraries
- Responsive
- Swipable on mobile
- Has bullet pagination
- Infinite sliding, but the code can be easily edited for finite sliding. Message me if you need help.

Go ahead and use the code for the carousel and edit it however you need for your use case. I put it here for my own purpose and for the community because it took me awhile to create this lightweight custom component. External libraries just contain too many features that I didn't need and makes it hard to work with.

Note: The photos I'm using are just huge to load, that's why there's a split second of a white slide for some images

Mobile demo: https://user-images.githubusercontent.com/36219316/113464331-95326f80-93e0-11eb-85b9-bc8d0490eb14.mov

Desktop demo: https://user-images.githubusercontent.com/36219316/113464306-716f2980-93e0-11eb-8768-61e88e100358.mov


## How the Carousel works
- Putting the images side by side
- Defining a div of fixed length that is the same width as the images
- Setting the div with overflow: hidden
- Creating event listeners (touch and click) that will translate the div in the X axis by (index * imgWidth)

Reference: https://codedaily.io/tutorials/Create-a-Snapping-Image-Swiper-like-Instagram-with-React

### Infinite Scrolling
Infinite carousel works on top of the above.

Lets say we have an originalArray = [1, 2, 3]. Each element is an image. But lets start off the array being tempArray = [3, 1, 2, 3, 1] and the current index = 1. The last element is appended to the beginning and the first element is appended to the end. The purpose is to make the transition from the end to the beginning fluid, giving it the infinite effect. It will make sense later.

Going forward

- If we're at the extra image at the end of the array (the first image we added to the end of the array), reset the array and the index to 1.
 
[3, 1, 2, 3, 1 (current)] ---> [3, 1 (current), 2, 3, 1]

Going backwards

- If we're at index 0, set current index to the last index of originalArray

[3 (current), 1, 2, 3] ----> [3, 1, 2, 3 (current), 1]

This is where I learned how to do infinite scrolling from. I changed it slightly because I realized their handleTransitionEnd could be optimized, but the fundamentals are the same. (Read this and then the Github repo attached): https://atomizedobjects.com/blog/react/create-a-react-carousel-using-react-hooks/
