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
    

//   const Links = [
//     "https://www.yelp.co.uk/biz/dishoom-london?hrid=EYcQz2hPb-A5Om5s9--IFg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-mayfair-chippy-london-2?hrid=psa4rFtb54ErsYiUgvKOTw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/mercato-mayfair-london?hrid=0Qwj_DvYeB8Yw2_p8sk5CQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-victoria-paddington?hrid=IljCOR1RxadjGQwDLbkktQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-breakfast-club-london-2?hrid=8n8MQHUOrgICz_vneT6__w&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/flat-iron-london-2?hrid=lVWp4a6gguuPlV9rzQukxg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/duck-and-waffle-london?hrid=MWCuBMQSbdf-lGAUhRxBhw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/mother-mash-london?hrid=eqjgkBVoZGuYiwZXJnNN-A&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/honey-and-co-london?hrid=GJ_0gt3kyg3RSK0fIDmKIQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/sketch-london-2?hrid=jnKAkdlT6eSF-a_l2JCgYw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-queens-arms-london?hrid=xqZiET-QhbErRyMtg73KVA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/restaurant-gordon-ramsay-london-3?hrid=Y8j92olFMlVMAOL-M2Bwcw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-grazing-goat-marylebone-london?hrid=i2tAaQTO2qhUYtZojY9PVw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/hawksmoor-seven-dials-london-4?hrid=OkS_2cEn7Fk2ZDOm7bb5tA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/dishoom-london-7?hrid=X0P-CcE1ZLu2ttc12hj_Ow&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-fat-bear-london?hrid=-9G0QF-xYQ-1C8qlsTl6PQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-golden-chippy-london?hrid=NY6-L_dVG_bfD6RYska-3g&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/duck-and-waffle-local-london?hrid=zDwueRzn1BnjfBOWD2f30Q&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/circolo-popolare-london?hrid=mKdQ19JDxMhXSlZNwHwWhw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/padella-london-3?hrid=cx8Pc85SoRQRVzlNTlX7zA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-wolseley-london?hrid=UdBEEpYV8bLF-gcB4UCUtQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/berners-tavern-london-5?hrid=I0RV70s0vCbb_yU86BSaNA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/norma-london?hrid=MvMeTpNiyoRuMyIj3JymtA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-barbary-london?hrid=RetcehLAFKhfaXrkSQC_rw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/gordon-ramsay-street-pizza-london?hrid=7H2Ka2-bz8J4_ona49tDEw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/fuckoffee-london-3?hrid=9mDne1ff7kuhTQP7AxzARw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/kiln-london?hrid=vbeC7UFFDq44TxeKXPUY1A&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/drury-london-2?hrid=bBu6cBRiJRqsGLVzq0N8NA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/nopi-london?hrid=m9cOdCIDXJX0tbWyFbhBEw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/old-compton-brasserie-soho?hrid=MovTqTAVD4QgU3TM8nLb7w&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-ivy-london?hrid=PFUXNU80tP1JL5VYthTUDw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/naru-london?hrid=yLyc6vJv178lgDTm_qPacg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/da-mario-restaurant-london?hrid=ZSlEd3u9CklzVuD-HlM25w&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/abeno-london?hrid=Zb_7pxybrT0ofJ-u5Ca61w&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/yauatcha-london-8?hrid=T4gSfRqy4Br_VPXgv33rIA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-alchemist-london-4?hrid=D3oZsl_uq3Nl_xh5WeQ5pA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/dirty-bones-soho-london?hrid=p3kLIWi5_bRnxj26wSSOww&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/soho-joe-london-2?hrid=FuA7M7pfEO3bJLuSjSmdlQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/cafe-vienna-london?hrid=ALwVJi_kVwV2qMtfL2hGqQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bao-soho-london?hrid=bS7BgO395XDtjzP_H_1bxQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/hook-london-5?hrid=jqkb0K9tuwwVoJeP9DhUsw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/tea-and-tattle-london?hrid=YsB358z9RWDIXmpYB9KRlQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/burger-and-lobster-london-2?hrid=y0pfJ1rJfS-CuOD3dXJqKA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/savoir-faire-london?hrid=WlbBqW46vtrWlH0ex08bgw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/blacklock-london-6?hrid=iLp0FW7L72UwhTqYnoFCbA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/shoryu-ramen-london?hrid=P71t_EADiq4hpfpONS7gHQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/busaba-soho-soho?hrid=G-DfQKkGTyAr_ohSbBUhNQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bibimbap-london-4?hrid=1DFtf6HKH-xgfM0B-SDgJQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/ffionas-restaurant-london?hrid=IVyG2gnxxVTrQqpYS7an7A&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/phat-phuc-noodle-bar-london?hrid=q1WuwLHS5_0Xszfv5FsO8Q&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/lanzhou-noodle-bar-london?hrid=-1Xk6xXR3NOKcQifGZtgaQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bradleys-restaurant-london?hrid=-8GO5zGH0whd5HEPdNGfYw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/barrafina-london-5?hrid=zjpqfwDxym_x45iPspRNWg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/koya-soho-london?hrid=QirDO-85De0J5uY4HnWdGw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/ngon-ngon-london?hrid=P-DWqvJk5Jx69vDKckkulA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-kings-arms-london-9?hrid=5zs404JTaGOFcf70Yp0lSg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/ye-olde-cheshire-cheese-london?hrid=A1i0nm3AVEwrclZ6jCNEyA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/39-steps-coffee-london?hrid=An2CQ78D45-gzHT_3RqF4g&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/piccolino-london-2?hrid=tC6SQiqaFr9_VGEo5iJ_WQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-lock-tavern-london?hrid=T8bwDi4d8ITvTEATyaYoog&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bills-london-4?hrid=JvV4jaMqk9A9KK4zczZE_g&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/barrafina-london-6?hrid=fgrfDNrIOYGutbqOJ6x-bw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/gastronomica-london-4?hrid=T5rYEZws5LrYVrex70XJdg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/scarlett-green-soho?hrid=99JPKbV2HShZqVEleL3Lsg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/hoppers-soho?hrid=v-40ROlEl-WGEdpCiswZmw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/hide-london?hrid=RO5TRZ-yq2myy1XreUnBFw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/gloria-london-2?hrid=jGrKP90l1p7FdpR1j4uImQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-pig-and-butcher-london?hrid=cBEntDtOJWgLgnqiXHHXKw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/jinjuu-london?hrid=zfulKwyuEKFgOZwrAiqFvg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/where-the-pancakes-are-london-2?hrid=9TQOh9By162QeFQJ7eQ8ZQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/kanada-ya-london?hrid=-hqHy_Ols0lvC-XPwlWl0g&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/fish-bone-london?hrid=yRm3xQn2lRH4feazceQQlg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/jos%C3%A9-london-2?hrid=GmiokEaCVNVySfcpoDcWUw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/little-georgia-london-2?hrid=yAmdHMgX9txLz9sbo2sKQQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/hawksmoor-london-13?hrid=k_C0LEyCt20vClt9nE72Gg&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/farm-girl-london?hrid=HiOEkFtjmmXCSk0a7sIfGw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/cereal-killer-cafe-london?hrid=5eWGW4KjMj1eDRb_ARGOaw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/texas-joes-london-2?hrid=PaaLvYec8sVpwnmFu0iT_Q&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/jean-georges-london?hrid=07g8U14Y9f8Qyr-KEwQ15g&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/cecconis-mayfair-london-2?hrid=CKCw69aEaGdCKm9QK6lAXA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-palomar-restaurant-london?hrid=7_hr2VkaymKJDUGB5llUpw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-churchill-arms-london?hrid=HTVUFbVR34a5tA6Lck1AoA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-harwood-arms-london?hrid=xXxmFwhxsFT3rgTyVTiYrw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/regency-caf%C3%A9-london-2?hrid=DuTix5z-_9RnL-XruZ2TlQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bizzarro-london?hrid=rj8CfD_SpaJbY8nP__WEWA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-sandwich-centre-london?hrid=exS_zOpbVsSYcXWUHD-DGQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/farmacy-london?hrid=yKLLYzNXDTCv9yKVDgpk7A&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bageriet-london?hrid=X33CQFEB06mgYKhMP-oJIw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/bocca-di-lupo-london?hrid=jdQW7WCeD_XbllymfXeoLA&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/sushi-tetsu-london?hrid=wDvFcih5gi6eKppeoLmDIw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/goodman-london-2?hrid=PgzrzwYNJKg2O_YM1squ_A&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/belgo-centraal-london?hrid=BoTA_hetPJd0_jXEsrV1Og&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-barge-house-london?hrid=wNYDjR_8ioAWDbgQzKLCtw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/wasabi-sushi-and-bento-london-3?hrid=XnlPi7Kqs7CPa44Wp5Njpw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-windmill-london-2?hrid=02vKSFLbuIC04sJvZxyOXw&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/the-ninth-london-london?hrid=1wTEVWEg6uWOoWR0UaEs2Q&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/el-rincon-quite%C3%B1o-london-2?hrid=TEjYuYj84jnow34Qq43JDQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/ottolenghi-islington?hrid=EkL8VGI_V40006UnBlwe_w&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/cirilo-filipino-kainan-london?hrid=wWuRsDxxPqcvb0Bad7BtJQ&osq=Restaurants&sort_by=rating_desc",
//     "https://www.yelp.co.uk/biz/princi-london?hrid=1yGuwkHXVM7w2kbE3zIgDA&osq=Restaurants&sort_by=rating_desc",
//   ];
  

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
