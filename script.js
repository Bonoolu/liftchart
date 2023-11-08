function calculateWith(amountSteps, cellNumber, step, novice, intermediate, ul, nl, il) {
  let amountUntrained = 0;
  let amountNovice = 0;
  let amountIntermediate = 0;
  for (let i = 0; i < amountSteps - 1; i++) {
    if (cellNumber < novice) {
      amountUntrained += 1;
    } else if (cellNumber < intermediate) {
      amountNovice += 1;
    } else {
      amountIntermediate += 1;
    }
    cellNumber += step;
  }
  return [(ul/amountUntrained), (nl/amountNovice), (il/amountIntermediate)]

}

const lifts = {
  "Push":[{"Bench Press": [40, 56, 78, 100]},
    {"Incline Dumbbell Bench Press":[14, 22, 31, 41]},
    {"Dumbbell Fly": [2, 10, 19, 29]},
    {"Shoulder Press": [23, 36, 51, 63]},
    {"Dumbbell Lateral Raise": [1, 6, 12, 18]},
    {"Tricep Pushdown": [15, 27, 45, 65]},
    {"Tricep Rope Pushdown": [15, 22, 37, 50]}],

  "Pull":[{"Deadlift": [35, 65, 105, 150]},
    {"Seated Cable Row": [35, 48, 68, 85]},
    {"Lat Pulldown": [35, 46, 65, 85]},
    {"Dumbbell Reverse Fly": [1, 6, 14, 22]},
    {"EZ Bar Curl": [25, 32, 47, 60]},
    {"Hammer Curl": [6, 12, 18, 26]},
    {"Barbell Shrug": [35, 65, 105, 150]}],

  "Legs":[
    {"Squat": [50, 74, 104, 135]},
    {"Front Squat": [50, 62, 84, 100]},
    {"Barbell Calf Raise": [35, 57, 95, 130]},
    {"Standing Cable Crunch": [20, 36, 62, 90]},
    {"Cable Woodchopper": [10, 16, 32, 45]}
  ]
};
const body = document.body;
const pageWidth = 3505;
const pageHeight = 4961;
const border = pageWidth / 400;
const div = document.createElement("div");
const gradient = false;
div.style.width = pageWidth.toString()+"px";
div.style.height = pageHeight.toString()+"px";
div.style.background = 'lightgray';
div.style.top = "0";
div.style.left = "0";
div.style.position = "absolute"
div.id = "capture";
const paddingLeft = pageWidth * 0.05;
body.appendChild(div);
const amount = 19;
const tableWidth = pageWidth;
const marginTop = pageHeight * 0.05;
const tableHeight = (pageHeight - (marginTop * 4))/3;
for(const day in lifts) {
  const tbl = document.createElement("table");
  marginLeftRight = "px " + paddingLeft.toString()+"px";
  tbl.style.background = "linear-gradient(90deg, gray 0%, gray 17.5%, red 22.5%,  red 37.5%, yellow 42.5%, yellow 67.5%, green 72.5%, green 100%)";
  tbl.style.height = tableHeight.toString()+"px";
  if (day === "Push" || day === "Pull") {
    tbl.style.margin = marginTop.toString()+marginLeftRight;
  } else {
    tbl.style.margin = marginTop.toString()+marginLeftRight;
  }
  const borderRadius = tableWidth * 0.03;
  //tbl.style.borderRadius = borderRadius.toString()+"px";
  tbl.style.border = border.toString() + "px solid black";
  console.log(day);
  for(const iLift in lifts[day]) {
    const lift = Object.keys(lifts[day][iLift])[0];
    const lastlift = Object.keys(lifts[day][lifts[day].length - 1])[0]
    console.log(lift);
    const tr = tbl.insertRow();
    const tdName = tr.insertCell();
    if (lift !== lastlift) {
      tdName.style.borderBottom = border.toString() + "px solid black";
    }
    const nameWidth = tableWidth * 0.2;
    tdName.style.width = nameWidth.toString()+"px";
    tdName.style.textAlign = "center";
    if (gradient) {
      tdName.style.background = "gray";
    }
    const pName = document.createTextNode(lift);
    const fontSize = pageHeight / amount / 4;
    tdName.style.fontSize = fontSize.toString()+"px";
    tdName.style.color = "white";
    tdName.appendChild(pName);
    const barWidth = tableWidth * 0.8;
    // const tdBar = tr.insertCell();
    // tdBar.style.width = barWidth+"px";
    // console.log("Bar width is " + barWidth.toString())
    const smallStep = 1;
    const largeStep = 5;
    const start = lifts[day][iLift][lift][0];
    const end = lifts[day][iLift][lift][3];
    let step = 0;
    const range = end - start;
    if (range >= 30) {
      step = largeStep;
    }else {
      step = smallStep;
    }
    const amountSteps = (range/step) + 1;
    const cellWidth = barWidth / amountSteps;
    let cellNumber = start;
    console.log("cell Width is: " + cellWidth.toString());
    console.log("amount Cells is: "  + amountSteps.toString());
    console.log("product is: "  + (amountSteps * cellWidth).toString());
    const novice = lifts[day][iLift][lift][1];
    const intermediate = lifts[day][iLift][lift][2];
    const untrainedLength = barWidth * 0.25;
    const noviceLength = barWidth * 0.375;
    const intermediateLength = barWidth * 0.375;
    const untrainedTd = tr.insertCell();
    untrainedTd.style.width = untrainedLength.toString()+"px";
    const noviceTd = tr.insertCell();
    noviceTd.style.width = noviceLength.toString()+"px";
    const intermediateTd = tr.insertCell();
    intermediateTd.style.width = intermediateLength.toString()+"px";
    let currentTd = untrainedTd;
    let stateFresh = true;
    let currentRow;
    [widthUntrained, widthNovice, widthIntermediate] = calculateWith(amountSteps, cellNumber, step, novice,
            intermediate, untrainedLength, noviceLength, intermediateLength);
    let currentWidth = widthUntrained;
    let fontColor = "white";
    for (let i = 0; i < amountSteps; i++) {
      let currentColor = "red";
      if (cellNumber < novice) {
        currentColor = "red";
        fontColor = "white";
      } else if (cellNumber <= intermediate) {
        if (currentTd !== noviceTd) {
          stateFresh = true;
          currentTd = noviceTd;
          currentWidth = widthNovice;
        }
        currentColor = "yellow";
        fontColor = "black";
      } else {
        if (currentTd !== intermediateTd) {
          stateFresh = true;
          currentTd = intermediateTd;
          currentWidth = widthIntermediate;
        }
        currentColor = "green";
        fontColor = "white";
      }
      if (gradient) {
        currentTd.style.background = currentColor;
      }
      let borderLeft = false;
      if (stateFresh) {
        const barTable = document.createElement("table");
        barTable.style.color = fontColor;
        currentRow = barTable.insertRow();
        stateFresh = false;
        currentTd.appendChild(barTable);
        borderLeft = true;
      }
      const tdCell = currentRow.insertCell();
      if (borderLeft) {
        tdCell.style.borderLeft = (border / 2).toString()+ "px solid black";// + currentColor;
      }
      tdCell.style.width = currentWidth.toString()+"px";
      tdCell.style.textAlign = "center";
      tdCell.style.fontSize = fontSize.toString()+"px";
      tdCell.appendChild(document.createTextNode(cellNumber));
      console.log("Current Lift:")
      console.log(lift)
      console.log("Last Lift:")
      console.log(lifts[day][lifts[day].length - 1])
      if (lift !== lastlift) tdCell.style.borderBottom = border.toString()+ "px solid black";
      cellNumber += step;
    }
  }
  div.appendChild(tbl);
}
