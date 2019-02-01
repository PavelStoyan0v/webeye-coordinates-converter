var regex = /(([NS])([0-9]{3})([0-9]{2})([0-9]{2})[0-9]{0,})"[ ]{0,}lon="(([WE])([0-9]{3})([0-9]{2})([0-9]{2}))/gm;

class Point
{
  static FromPath(input) {
    let m;
    let points = [];
    while ((m = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // Convert all 
        for(let i = 0; i < m.length; i++) {
          if(!isNaN(m[i])) {
            m[i] = Number(m[i]);
          }
        }
        
        // Calculate decimal values from degrees minutes seconds
        let lat = m[3] + m[4] / 60 + m[5] / 3600;
        let lon = m[8] + m[9] / 60 + m[10] / 3600;
        // Make coordinates negative depending on the direction
        lat *= m[2].toLowerCase() == "s" ? -1 : 1;
        lon *= m[7].toLowerCase() == "w" ? -1 : 1;

        let point = [lat, lon];
        points.push(point);
    }

    return points
  }
      
}

$('#input').bind('input propertychange', function() {
  let lines = [];  
  let points = Point.FromPath($(this).val());
  console.log(points);
  for(let i = 0; i < points.length; i++) {
    lines.push(
      Number(points[i][0]).toFixed(7) + ":" + Number(points[i][1]).toFixed(7)
    );
  }

  $('#output').val(lines.join(`\n`));
});
