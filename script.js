document.addEventListener("DOMContentLoaded", function () {

    const searchButton = document.getElementById("search");
    const usernameInput = document.getElementById("user-input");

    const statsContainer = document.querySelector(".stats-container");

    const easyProgressCircle = document.querySelector(".easyprogress");
    const mediumProgressCircle = document.querySelector(".mediumprogress");
    const hardProgressCircle = document.querySelector(".hardprogress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {

        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;

        const ismatching = regex.test(username);

        if (!ismatching) {
            alert("Username Invalid");
        }

        return ismatching;
    }

    async function fetchUserDetails(username){
        const url=`https://leetcode-api-faisalshohag.vercel.app/${username}`;
        try{
            searchButton.innerText = "Searching...";
            searchButton.disabled=true;
            const response=await fetch(url);
            if(! response.ok){
                throw new Error("Unable to fetch the user details");

            }
            const data=await response.json();
            console.log("logging data:",data);
        

        displayUserData(data);
        }
        catch(error){

            statsContainer.innerHTML=`<p> no data found</p>`
        }
        finally{
            searchButton.innerText="search";
            searchButton.disabled=false;
        }
    }function updateProgress(solved, total, label, circle) {

        const progressDegree = (solved / total) * 100;

        circle.style.background = `conic-gradient(
            #299f5d ${progressDegree}%,
            #283a2e ${progressDegree}% 100%
        )`;

        label.textContent = `${solved}/${total}`;
    }

      function displayUserData(data) {

        statsContainer.style.display = "block";

        const totalEasy = 1000;
        const totalMedium = 2000;
        const totalHard = 500;

        updateProgress(data.easySolved, totalEasy, easyLabel, easyProgressCircle);
        updateProgress(data.mediumSolved, totalMedium, mediumLabel, mediumProgressCircle);
        updateProgress(data.hardSolved, totalHard, hardLabel, hardProgressCircle);

        cardStatsContainer.innerHTML = `
            <div class="card">
                <h4>Total Solved</h4>
                <p>${data.totalSolved}</p>
            </div>

            <div class="card">
                <h4>Ranking</h4>
                <p>${data.ranking}</p>
            </div>

            <div class="card">
                <h4>Acceptance Rate</h4>
                <p>${data.acceptanceRate || "N/A"}</p>
            </div>
        `;
    }
    searchButton.addEventListener('click', function () {

        const username = usernameInput.value;

        console.log("Logging in username:", username);

        if(validateUsername(username)){
        fetchUserDetails(username)
        }

    }); 


});