# Sorting-Visualized
[Live Deployment](https://clabel95.github.io/Sorting-Visualized/)

## About
A program to visualize different sorting algorithms. 

This application allows the user to choose from multiple different sorting algorithms and shows the steps that algorithm uses to sort an array of numbers. 

The application allows the user to input their desired size of array so they can see the sorting on small and also large scale arrays.

The user is also able to choose between different sorting speeds. The user can slow down the sort so that they can more easily see what is happening or they can chose no delay so that they can get a real time value for how long the sort took to complete. 

The application generates a random array of numbers from 1 to 10 million. The reason I have set the numbers to go that high is because I wanted to properly show off the sorting algorithms with values that could be more applicable to the real world. 

## Algorithms
Currently the application has four different algorithms to chose from.

- Bubble sort
- Selection sort
- Insertion sort
- Radix sort

Personaly my favorite and also the fastest sort is the Radix sort. I recomend setting the quantity to a large number such as 2000 and setting the speed to slow to see the sort in action. 

## Bubble Sort

This method works by examining each set of adjacent elements in the string, from left to right, switching their positions if they are out of order.

|Case             |big O|
|-----------------|-----|
|Worst case time  |	O( n)|
|Best case time   |	O( n<sup>2</sup>)|
|Average case time|	O( n<sup>2</sup>)|
|Space            | O(1)|



## Selection Sort

Selection sort works by taking the smallest element in an unsorted array and bringing it to the front. You’ll go through each item (from left to right) until you find the smallest one. The first item in the array is now sorted, while the rest of the array is unsorted.
|Case             |big O|
|-----------------|-----|
|Worst case time  |	O( n<sup>2</sup>)|
|Best case time   |	O( n<sup>2</sup>)|
|Average case time|	O( n<sup>2</sup>)|
|Space            | O(1)|

## Insertion Sort

In an insertion sort, the first element in the array is considered as sorted, even if it is an unsorted array. In an insertion sort, each element in the array is checked with the previous elements, resulting in a growing sorted output list. With each iteration, the sorting algorithm removes one element at a time and finds the appropriate location within the sorted array and inserts it there. The iteration continues until the whole list is sorted.

|Case             |big O|
|-----------------|-----|
|Worst case time  |	O( n<sup>2</sup>)|
|Best case time   |	O(n)|
|Average case time|	O( n<sup>2</sup>)|
|Space            | O(1)|

### Radix Sort

Radix sort is an integer sorting algorithm that sorts data with integer keys by grouping the keys by individual digits that share the same significant position and value (place value). Radix sort uses counting sort as a subroutine to sort an array of numbers. Because integers can be used to represent strings (by hashing the strings to integers), radix sort works on data types other than just integers. Because radix sort is not comparison based, it is not bounded by \Omega(n \log n)Ω(nlogn) for running time — in fact, radix sort can perform in linear time.

Radix sort incorporates the counting sort algorithm so that it can sort larger, multi-digit numbers without having to potentially decrease the efficiency by increasing the range of keys the algorithm must sort over (since this might cause a lot of wasted time).

|Case             |big O|
|-----------------|-----|
|Worst case time  |	O(nk)|
|Best case time   |	O(nk)|
|Average case time|	O(nk)|
|Space            | O(n)|


