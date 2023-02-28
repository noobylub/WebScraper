//List all of the pizza restaurants from yelp
import puppeteer from "puppeteer";
async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  console.log("starting");
  const page = await browser.newPage();
    await page.goto("https://www.yelp.com/");
    await page.type("#search_location", "London");
    await page.type("#search_description", "Restaurants");
    await page.click(".css-dew2bp");
    await page.waitForTimeout(5000); // wait for 5 seconds
    let Links = [];
    //   //scrap individual webpages for the link to more
    const scrapPage = async () => {
      const allLinks = await page.$$eval(
        ".padding-t3__09f24__TMrIW.padding-r3__09f24__eaF7p",
        (el) => {
          return el.map((e) => {
            const link = e.querySelector(".css-1um3nx ").getAttribute("href");
            return (actualLink =
              "https://www.yelp.co.uk" + link + "&sort_by=rating_desc");
            //console.log(actualLink);
          });
        }
      );
      allLinks.forEach((e) => {
        Links.push(e);
      });

      const resultsMax = await page.$eval(
        ".text-align--center__09f24__fYBGO > .css-chan6m ",
        (el) => {
          const maxData = el.textContent;
          let all = maxData.split(" ");
          if (all[0] != all[2]) {
            return true;
          } else {
            return false;
          }
        }
      );
      console.log(resultsMax);
      if (resultsMax) {
        await page.$eval(".next-link", (el) => {
          el.click();
        });
        await page.waitForTimeout(5000);
        await scrapPage();
      }
    };
    await scrapPage();
    

  let randoLink = [];
  //choose 3 random restos and check how many reviews they get
  //if less than 50 then it is excluded.
  //IMPORTANT
  for (let x = 0; x < 3; x++) {
    let linkToPush =
      " https://www.yelp.co.uk/biz/princi-london?hrid=1yGuwkHXVM7w2kbE3zIgDA&osq=Restaurants&sort_by=rating_desc";
    const amountReview = false;
    while (amountReview == false) {
      linkToPush = Links[Math.floor(Math.random() * Links.length)];
      await page.goto(linkToPush);
      let totalStar = await page.waitForXPath(
        "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[3]/div/div[1]/div/span/div[2]/p"
      );
      const ratingsEval = await page.evaluate((el) => {
        return el.textContent;
      }, totalStar);
      const totalStars = ratingsEval.split(" ");
      const totalReviews = parseInt(totalStars[0]);
      console.log("Total reviews ", totalReviews);
      if (totalReviews < 50) {
        console.log("rejected");
        continue;
      } else {
        console.log("Accepted");
        randoLink.push(linkToPush);
        break;
      }
    }
  }

  //Gets all the review of five stars and one stars
  //five star review
  //IMPORTANT
  const fiveStarRating = async (num) => {
    await page.goto(randoLink[num]);
    const clicking = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[3]/div/div[2]/div[1]/div/div[1]/p"
    );
    const toClick = await page.evaluate((element) => {
      element.click();
    }, clicking);
    await page.waitForTimeout(3000);
    const el = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/ul"
    );

    var fiveStarReviews = await page.evaluate(async (element) => {
      const allReview = element.querySelectorAll(
        ".comment__09f24__gu0rG.css-qgunke"
      );
      console.log(allReview.length);

      let twoReviews = [];
      for (let x = 0; x < allReview.length / 4; x++) {
        twoReviews.push(allReview[x].innerText);
      }
      console.log(twoReviews);
      return twoReviews;
    }, el);
    return fiveStarReviews;
  };

  //two star review
  const oneStarRating = async (num) => {
    await page.goto(randoLink[num]);
    //checking if there is less than amount
    const clicking = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[3]/div/div[2]/div[5]/div/div[1]/p"
    );
    const toClick = await page.evaluate((element) => {
      element.click();
    }, clicking);

    await page.waitForTimeout(3000);
    const el = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/ul"
    );
    const oneStar = await page.evaluate(async (element) => {
      const data = await element.querySelectorAll(
        ".comment__09f24__gu0rG.css-qgunke"
      );
      let reviews = [];
      //only get 3

      for (let x = 0; x < data.length / 4; x++) {
        reviews.push(data[x].innerText);
      }

      return reviews;
    }, el);
    return oneStar;
  };

  //IMPORTANT
  //Getting all the data together
  const finalData = [];
  for (let x = 0; x < randoLink.length; x++) {

    await page.goto(randoLink[x]);
    console.log(randoLink[x])
    //click on five stars
    const clicking = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[3]/div/div[2]/div[1]/div/div[1]/p"
    );
    const toClick = await page.evaluate((element) => {
      element.click();
    }, clicking);

    //get the total amount of five stars
    await page.waitForTimeout(3000);
    let totalFiveStar = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[4]/div[2]/div[1]/span"
    );
    let ratings = await page.evaluate((el) => {
      return el.textContent;
    }, totalFiveStar);
    let arrayFive = ratings.split(" ");

    totalFiveStar = arrayFive[2].substring(1);
    console.log("five star: ", totalFiveStar);

    //get the total number of stars
    let totalStar = await page.waitForXPath(
      "/html/body/yelp-react-root/div[1]/div[4]/div/div/div[2]/div/div[1]/main/div[3]/div/section/div[2]/div/div[3]/div/div[1]/div/span/div[2]/p"
    );
    const ratingsEval = await page.evaluate((el) => {
      return el.textContent;
    }, totalStar);
    const totalStars = ratingsEval.split(" ");
    console.log("total stars:", totalStars);
    //The rating of how much peopel really really love the restaurant
    const loveRating = parseInt(totalFiveStar) / parseInt(totalStars);
    console.log("Love rating", loveRating);
    await page.waitForTimeout(3000)
    
    //Reviews
    const oneStar = await oneStarRating(x); 
    console.log("")
    let nu =0;
    console.log("Negatives")
    oneStar.forEach(e => {
        nu++; 
        console.log("Review no.",nu)
        console.log(e)
        console.log("")
    })
    const fiveStars = await fiveStarRating(x);
    console.log("")
    console.log("Positives")
    nu =0
    fiveStars.forEach(e => {
        nu++; 
        console.log("Review no.",nu)
        console.log(e)
        console.log("")
    })
    console.log("")
    console.log("")
    
  }



  
  
}
main();
