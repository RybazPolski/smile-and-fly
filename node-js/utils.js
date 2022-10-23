async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
/**
 * Determine viewport height to use as base for each scroll distance.
 *
 * @param {Page} page
 * @return {number}
 */
const getViewportHeight = (page) => {
  const height = page.evaluate(_=>{return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)})
  if (height) {
    return height
  } else {
    throw new Error(`Viewport not available on page.`)
  }
}

/**
 * Generate a random distance between 30% - 70% of the viewport height.
 *
 * @param {number} distance
 * @return {number}
 */
const randomDistance = (distance) =>
  randomInt(distance * 0.3, distance * 0.7)

/**
 * Sends a synthetic scroll gesture via CDP.
 *
 * @param {Page} page
 * @param {number} distance
 * @return {Promise<void>}
 */
const scrollDown = async (
  page,
  distance
)=> {
  await page._client.send("Input.synthesizeScrollGesture", {
    x: 0,
    y: 0,
    xDistance: 0,
    yDistance: distance
  })
}

/**
 * Primary vertical scroll function.
 * Accepts a target element and scrolls a randomized distance until intersecting viewport.
 *
 * @param {ElementHandle} el
 * @return {Promise<void>}
 */
const scrollTo = async (el, page)  => {
  // Extract the page from the element handle.
  // Use the viewport height as a baseline to randomize each scroll distance.
  const viewportHeight = getViewportHeight(page)
  // Continue to scroll random distance until element is in viewport.
  while (!(await el.isIntersectingViewport())) {
    await scrollDown(page, randomDistance(viewportHeight))
    await page.waitForTimeout(randomInt(50, 500))
  }
}

module.exports = {
    autoScroll, scrollTo
}