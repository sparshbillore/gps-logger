import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function PieChart({text, dataPoints}) {
    const dataPointsChart = dataPoints.map((item)=>{
        return {y : item.percentage , label: item.location}
        
    })

    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: text
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: dataPointsChart
        }]
    }
  return (
    <div>
			<CanvasJSChart options = {options} />
	</div>
  )
}

export default PieChart
