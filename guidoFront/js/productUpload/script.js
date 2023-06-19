var width = 700,
  height = 700,
  initialScale = 5500,
  initialX = -11900,
  initialY = 4050,
  centered,
  labels;

var projection = d3.geo
  .mercator()
  .scale(initialScale)
  .translate([initialX, initialY]);

var path = d3.geo.path().projection(projection);

var zoom = d3.behavior
  .zoom()
  .translate(projection.translate())
  .scale(projection.scale())
  .scaleExtent([height, 800 * height])
  .on('zoom', zoom);

var svg = d3
  .select('#container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('id', 'map');

var states = svg.append('g').attr('id', 'states').call(zoom);

states
  .append('rect')
  .attr('class', 'background')
  .attr('width', width)
  .attr('height', height);

d3.json('../js/korea.json', function (json) {
  states
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('id', function (d) {
      return 'path-' + d.id;
    })
    .on('click', click);

  labels = states
    .selectAll('text')
    .data(json.features)
    .enter()
    .append('text')
    .attr('transform', labelsTransform)
    .attr('id', function (d) {
      return 'label-' + d.id;
    })
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .on('click', click)
    .text(function (d) {
      return d.properties.Name;
    });
});

function click(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
  }

  states.selectAll('path').classed(
    'active',
    centered &&
      function (d) {
        return d === centered;
      }
  );

  states
    .transition()
    .duration(1000)
    .attr(
      'transform',
      'translate(' +
        width / 2 +
        ',' +
        height / 2 +
        ')scale(' +
        k +
        ')translate(' +
        -x +
        ',' +
        -y +
        ')'
    )
    .style('stroke-width', 1.5 / k + 'px');
}

function zoom() {
  projection.translate(d3.event.translate).scale(d3.event.scale);
  states.selectAll('path').attr('d', path);

  labels.attr('transform', labelsTransform);
}

function labelsTransform(d) {
  console.log(path.centroid(d));

  // 경기도가 서울특별시와 겹쳐서 예외 처리
  if (d.id == 8) {
    var arr = path.centroid(d);
    arr[1] +=
      d3.event && d3.event.scale
        ? d3.event.scale / height + 20
        : initialScale / height + 20;

    return 'translate(' + arr + ')';
  } else {
    return 'translate(' + path.centroid(d) + ')';
  }
}

// 버튼
$('#radio').buttonset();
$('#zoomin')
  .button({
    text: false,
    icons: {
      primary: 'ui-icon-plus',
    },
  })
  .click(function () {
    var arr = projection.translate(),
      scale = projection.scale();

    arr[0] = arr[0] * 1.2;
    arr[1] = arr[1] * 1.2;
    scale = scale * 1.2;

    projection.translate(arr).scale(scale);
    states.selectAll('path').attr('d', path);

    labels.attr('transform', labelsTransform);
  });
$('#zoomout')
  .button({
    text: false,
    icons: {
      primary: 'ui-icon-minus',
    },
  })
  .click(function () {
    var arr = projection.translate(),
      arr2 = projection.translate(),
      scale = projection.scale();

    arr[0] = arr[0] * 0.8;
    arr[1] = arr[1] * 0.8;
    scale = scale * 0.8;

    projection.translate(arr).scale(scale);
    states.selectAll('path').attr('d', path);

    labels.attr('transform', labelsTransform);
  });

// 지명표시
$('#radio')
  .find('input')
  .on('click', function () {
    if (this.value == 'on') {
      labels.style('display', 'block');
    } else if (this.value == 'off') {
      labels.style('display', 'none');
    }
  });
