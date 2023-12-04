/*
  Name: Rob Tai
  Date: 11.25.23
  This is the js pages for my CP4 homework in AD 320 class. This provides js for index.html
*/

"use strict";
(function() {

  /**
   * Add a function that will be called when the window is loaded.
   */
    window.addEventListener("load", init);

  /**
   * Initialize action listener to the generate user button
   */
  function init() {
    addActionListener();
  }


  /**
   * add action listener to the main button
   */
  function addActionListener(){
    id("inputForm").addEventListener("submit", function(event){
      event.preventDefault();

      makeLogInRequest();
      }
    );
  }


    /**
   *  make actual api request when one adds a quote
   */
    function makeLogInRequest() {
  
      let email = id("email").value;
      let password = id("password").value;
      let type = id("selector").value;
  
      const obj = {email: email, password: password, type: type};

      let url = `http://localhost:8000`;
      console.log(JSON.stringify(obj));
      fetch(url, {
        method: "POST", 
        body: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(statusCheck)
      .then(res => res.text())
      .then(processData_log)
      .catch(handleError);
    }


   /**
   * process the results from API request - add a new quote
   * @param {object} responseData -- response object from API request
   */
    function processData_log(responseData){
        
        id("login-page").classList.add("hidden");
        console.log("u in mijo.");

        
    }

  /**
   *  Handle error if there is something going wrong during fetching/processing of API request
   */
  function handleError(){
    console.log("mjo why u noob");

  }


  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID
   * @return {object} DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} query - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();