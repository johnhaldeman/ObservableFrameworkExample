---
theme: [deep-space, alt, wide]
---


# LCBO Top 20s

The top 20 LCBO products based on various measures using the
<a href="https://lcbostats.com/">LCBOstats API</a>. Retrieved sometime in September 2024 or so.
Not all products listed are currently available.


```js
import * as Plot from "npm:@observablehq/plot";

function topPlot(data, {width, title, margin, measure, reverseSort, subtitle} = {}) {
  return Plot.plot({
    title,
    subtitle,
    width,
    x: {label: measure, normalize: "first"},
    y: {label: ""},
    color: {legend: true},
    marks: [
      Plot.rectX(data, {
        x: measure,
        y: "title",
        fill: "subcategory",
        sort: {y: reverseSort ? "-x": "x"},
        marginLeft: margin
      })
    ]
  });
}
```

```js

const removeDuplicates = (items) => {
    let newItems = [];
    let seenItems = {};

    for (let item of items) {
        if(!seenItems[item.title]){
            newItems.push(item)
        }
        seenItems[item.title] = true;
    }
    return newItems;
}

const cheapest = removeDuplicates((await FileAttachment("./data/price-ascending.json").json()).data);
const mostexpensive = removeDuplicates((await FileAttachment("./data/price-descending.json").json()).data);
const mostalcohol = removeDuplicates((await FileAttachment("./data/alcohol_content-descending.json").json()).data);
const largestsize = removeDuplicates((await FileAttachment("./data/volume-descending.json").json()).data);
const highestpriceindex = removeDuplicates((await FileAttachment("./data/price_index-ascending.json").json()).data);
const mostreviews = removeDuplicates((await FileAttachment("./data/reviews-descending.json").json()).data);
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => topPlot(cheapest, {width, title: "Top 20 cheapest products", margin: 250, measure: "price"}))}  
  </div>
  <div class="card">
    ${resize((width) => topPlot(mostexpensive, {width, title: "Top 20 most expensive products", margin: 420, measure: "price", reverseSort: true}))}  
  </div>
  <div class="card">
    ${resize((width) => topPlot(mostalcohol, {width, title: "Top 20 products with most alcohol per volume", margin: 270, measure: "alcohol_content", reverseSort: true}))}  
  </div>
  <div class="card">
    ${resize((width) => topPlot(largestsize, {width, title: "Top 20 products with largest volume", margin: 300, measure: "volume", reverseSort: true}))}  
  </div>
  <div class="card">
    ${resize((width) => topPlot(highestpriceindex, {width, title: "Top 20 products with lowest price index", 
        subtitle: "The lower the price index, the more alcohol content per dollar. Calculated as: price / (% alcohol * volume)",
        margin: 200, measure: "price_index"}))}  
  </div>
  <div class="card">
    ${resize((width) => topPlot(mostreviews, {width, title: "Top products with most reviews", 
        margin: 200, measure: "reviews", reverseSort: true}))}  
  </div>
</div>
