import {parseArgs} from "node:util";

const {
    values: {field, sort}
  } = parseArgs({
    options: {
        field: {type: "string"},
        sort: {type: "string"}
    }
  });
  


async function json(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
    return await response.json();
  }
  
  const data = await json(`https://lcbostats.com/api/alcohol?${sort === "ascending"? "sortAsc" : "sortDesc" }=${field}`);
  
  process.stdout.write(JSON.stringify(data));

