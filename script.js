// -----Original Question -----

/**
 * #6 (STRETCH) Greatest Position Distance
 * --------------------
 * 1. Create a largish array of numbers, including at least two different
 *    numbers that repeat (e.g. 0, 2, 2, 7, 4, 1, 7, 8)
 * 2. Write a loop that finds the greatest position distance between
 *    repeating numbers in your array. In the above example, the 2's have
 *    a distance of 1, while the 7's have a distance of 3, so the
 *    greatest position distance for that array is 3.
 * 3. Output the array and its greatest position distance
 */


// Example output
// 5, 1, 8, 2, 9, 1, 4, 5, 0
// Greatest Position Distance: 7

// -----My Answer-----

function findGreatestDistance(userInput = document.getElementById("userInput").value){ // default param of the userInput values

    let outputDiv = document.querySelector("#output"); // Assigning the div where the result populates
    userInput.replace(' ',''); // Eliminating white space
    let tempArray = userInput.split(','); // Converting string to array
    let numArray = []; // Empty array that will contain converted string numbers to datatype numbers
    for(let num of tempArray){
        numArray.push(Number(num));
    }

    let result; // Result to be returned
    let timesInArray = {}; // Empty object for collecting repetitions of a number
    let greatestDistance = 1; // Set initial min distance for repetitions to 1
    let greatestDistanceNum = []; // Used array for the number with the greatest distance in case of ties
    let duplicates = false; // Boolean to make sure that a duplicate number exists

    if (Array.isArray(numArray) === false){ // making sure array is created correctly
        return outputDiv.innerHTML ='Input must be an array';
    }
    if (numArray.length < 1){ // making sure array has two numbers so a distance can exist
        return outputDiv.innerHTML ="Input must have at least two values";
    }
    for (let val of numArray){ // Making sure that type conversion happened correctly
        if (typeof val !== "number"){
            console.log(typeof val);
            console.log(val);
            return outputDiv.innerHTML = "All array values must be numbers";
        }
        else if (isNaN(val)){ // Making sure non-numbers were entered (bools, arrays, objects, etc)
            return outputDiv.innerHTML ="All array values must be numbers";
        }
    }

    for (let num of numArray){ // Iterating through the array and capturing how many times each number is there
        num in timesInArray ? timesInArray[num] += 1 : timesInArray[num] = 1;
    }
    
    for (let [num,val] of Object.entries(timesInArray)){ // Iterating through the object to get the numbers that have repetitions
        if (val > 1){
            duplicates = true; // Boolean flips true because a duplicate is detected
            let numDistance = numArray.lastIndexOf(Number(num)) - numArray.indexOf(Number(num)); // Finding max distance for each duplicate
            if (numDistance > greatestDistance){ // Setting the new largest distance and corresponding number if that distance is higher
                greatestDistance = numDistance;
                greatestDistanceNum = [num];
            }
            else if (numDistance === greatestDistance){ // Adding the number to the array since there was a tie for greatest distance
                greatestDistanceNum.push(num);
            }
        }
    }
    
    
    // Console statements depending on the amount of numbers with greatest distance
    
    if (greatestDistanceNum.length === 1){ // For a clear winner
        return outputDiv.innerHTML = `
        Array used: ${numArray} <br>
        Number with greatest distance is ${greatestDistanceNum} <br>
        It has a distance of ${greatestDistance}
        `;
    }
    else if (greatestDistanceNum.length > 1){ // For a tie
        return outputDiv.innerHTML =`
        Array used: ${numArray}<br>
        There was a tie for the greatest distance!<br>
        Numbers tied were: ${greatestDistanceNum}<br>
        The greatest distance was ${greatestDistance}
        `;
    }
    else if (duplicates === false){ // No repeating number
        return outputDiv.innerHTML = `
        Array used: ${numArray} <br>
        No number was repeated!`;
    }
    else { // Something else weird happened. Probably an indexing error resulting in a negative
        return outputDiv.innerHTML =`
        Array used: ${numArray} <br>
        Something went wrong :( <br>
        `;
    }
};

