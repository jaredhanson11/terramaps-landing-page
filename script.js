// Feature flags
const useBasemapPreview = true;

// Preload Bay Area zip boundary data for bulk ops viz
const nvUtZipsPromise = d3.json('assets/bayarea-zips-paths.json?v=13');

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Ensure hero background video plays at normal rate (file is already slowed)
window.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('hero-video');
    if (!heroVideo) return;

    const applyRate = () => {
        heroVideo.playbackRate = 1;
        heroVideo.defaultPlaybackRate = 1;
    };

    applyRate();
    heroVideo.addEventListener('loadedmetadata', applyRate);
    heroVideo.addEventListener('canplay', applyRate);
    heroVideo.addEventListener('play', applyRate);
});

// ===== VISUAL PREVIEWS (PRE-ANIMATION) =====
const fadeOutPreview = (svg) => {
    svg.selectAll('.viz-preview-item').interrupt().remove();
};

const renderVizPreview = (id) => {
    const svg = d3.select(`#${id}`);
    const width = +svg.attr('width') || 500;
    const height = +svg.attr('height') || 280;
    svg.selectAll('*').remove();

    const preview = svg.append('g')
        .attr('class', 'viz-preview-item')
        .attr('opacity', 1);

    if (id === 'connect-viz') {
        const tableX = 20;
        const tableY = 40;
        const headerHeight = 22;
        const rowHeight = 18;
        const colWidths = [45, 60, 60, 40, 60, 30];
        const totalTableWidth = colWidths.reduce((a, b) => a + b, 0) + 10;

        preview.append('rect')
            .attr('x', tableX)
            .attr('y', tableY)
            .attr('width', totalTableWidth)
            .attr('height', headerHeight + rowHeight * 6)
            .attr('fill', 'white')
            .attr('stroke', '#e2e8f0')
            .attr('stroke-width', 1)
            .attr('rx', 4)
            .attr('opacity', 0.7);

        preview.append('rect')
            .attr('x', tableX)
            .attr('y', tableY)
            .attr('width', totalTableWidth)
            .attr('height', headerHeight)
            .attr('fill', '#f1f5f9')
            .attr('rx', 4)
            .attr('opacity', 0.7);

        const headers = ['Zip', 'Territory', 'Region', 'Area', 'Account', '...'];
        let headerX = tableX + 8;
        headers.forEach((header, i) => {
            preview.append('text')
                .attr('x', headerX)
                .attr('y', tableY + 16)
                .attr('font-size', '11px')
                .attr('font-weight', '600')
                .attr('fill', '#0f172a')
                .attr('opacity', 0.6)
                .text(header);
            headerX += colWidths[i];
        });

        const mapX = 335;
        const mapY = 50;
        const mapWidth = 155;
        const mapHeight = 170;

        preview.append('rect')
            .attr('x', mapX)
            .attr('y', mapY)
            .attr('width', mapWidth)
            .attr('height', mapHeight)
            .attr('fill', '#ffffff')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 1)
            .attr('rx', 4)
            .attr('opacity', 0.7);

        svg.append('defs').append('clipPath')
            .attr('id', 'connect-map-clip-preview')
            .append('rect')
            .attr('x', mapX)
            .attr('y', mapY)
            .attr('width', mapWidth)
            .attr('height', mapHeight)
            .attr('rx', 4);

        preview.append('image')
            .attr('x', mapX - 370)
            .attr('y', mapY - 146)
            .attr('width', mapWidth * 3.45)
            .attr('height', mapHeight * 3.45)
            .attr('href', 'assets/us-states-map.svg')
            .attr('opacity', 0.35)
            .style('pointer-events', 'none')
            .attr('clip-path', 'url(#connect-map-clip-preview)');
    }

    // build-viz: no preview — actual animation loads immediately from pre-computed JSON

    if (id === 'refine-viz') {
        const margin = { top: 50, right: 30, bottom: 40, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const g = preview.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const chartData = [1380,1310,1215,1170,1145,1125,1110,1095,1085,1075,1065,1055,1048,1042,1038,1035,1032,1030,1028,1025,1018,1005,980,955,910,875,840,800,730,650];

        const xScale = d3.scaleLinear().domain([0, chartData.length - 1]).range([0, chartWidth]);
        const yScale = d3.scaleLinear().domain([600, 1450]).range([chartHeight, 0]);

        g.append('rect')
            .attr('x', 0)
            .attr('y', yScale(1200))
            .attr('width', chartWidth)
            .attr('height', yScale(800) - yScale(1200))
            .attr('fill', '#22c55e')
            .attr('opacity', 0.08)
            .attr('rx', 2);

        g.append('g')
            .attr('opacity', 0.25)
            .call(d3.axisLeft(yScale).ticks(5).tickSize(-chartWidth).tickFormat(d => d))
            .selectAll('.domain').remove();

        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(chartData)
            .attr('fill', 'none')
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2.5)
            .attr('d', line)
            .attr('opacity', 0.45);

        g.selectAll('.preview-dot')
            .data(chartData)
            .enter()
            .append('circle')
            .attr('cx', (d, i) => xScale(i))
            .attr('cy', d => yScale(d))
            .attr('r', 3)
            .attr('fill', '#22c55e')
            .attr('opacity', 0.45);
    }

    if (id === 'collab-viz') {
        const users = [
            { y: 65, color: '#3b82f6' },
            { y: 115, color: '#f97316' },
            { y: 165, color: '#a855f7' }
        ];
        const userX = 50;
        const centerX = 160;
        const centerY = 115;
        const mapX = 260;
        const mapWidth = 230;
        const mapHeight = 150;

        users.forEach(user => {
            preview.append('circle')
                .attr('cx', userX)
                .attr('cy', user.y)
                .attr('r', 22)
                .attr('fill', user.color)
                .attr('opacity', 0.6);

            preview.append('line')
                .attr('x1', userX + 22)
                .attr('y1', user.y)
                .attr('x2', centerX)
                .attr('y2', centerY)
                .attr('stroke', '#9ca3af')
                .attr('stroke-width', 3)
                .attr('opacity', 0.4);
        });

        preview.append('circle')
            .attr('cx', centerX)
            .attr('cy', centerY)
            .attr('r', 6)
            .attr('fill', '#3b82f6')
            .attr('opacity', 0.6);

        preview.append('rect')
            .attr('x', mapX - 10)
            .attr('y', centerY - 50)
            .attr('width', mapWidth)
            .attr('height', mapHeight)
            .attr('fill', 'none')
            .attr('stroke', '#e2e8f0')
            .attr('rx', 4)
            .attr('opacity', 0.5);

        preview.append('image')
            .attr('x', mapX)
            .attr('y', centerY - 45)
            .attr('width', mapWidth - 10)
            .attr('height', mapHeight - 10)
            .attr('href', 'assets/us-states-map.svg')
            .attr('opacity', 0.35)
            .style('pointer-events', 'none');
    }

    if (id === 'report-viz') {
        preview.append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', width - 20)
            .attr('height', height - 20)
            .attr('fill', 'white')
            .attr('stroke', '#e2e8f0')
            .attr('stroke-width', 2)
            .attr('rx', 6)
            .attr('opacity', 0.7);

        preview.append('text')
            .attr('x', 30)
            .attr('y', 40)
            .attr('font-size', '22px')
            .attr('font-weight', '700')
            .attr('fill', '#3b82f6')
            .attr('opacity', 0.6)
            .text('West Area');

        const mapX = 15;
        const mapY = 65;
        const mapW = 145;
        const mapH = 165;

        svg.append('defs')
            .append('clipPath')
            .attr('id', 'west-clip-preview')
            .append('rect')
            .attr('x', mapX)
            .attr('y', mapY)
            .attr('width', mapW)
            .attr('height', mapH);

        preview.append('image')
            .attr('x', mapX - 5)
            .attr('y', mapY - 20)
            .attr('width', 280)
            .attr('height', 210)
            .attr('href', 'assets/us-states-map.svg')
            .attr('opacity', 0.35)
            .attr('clip-path', 'url(#west-clip-preview)')
            .style('pointer-events', 'none');

        preview.append('rect')
            .attr('x', 165)
            .attr('y', 75)
            .attr('width', 275)
            .attr('height', 140)
            .attr('fill', 'white')
            .attr('stroke', '#e2e8f0')
            .attr('rx', 3)
            .attr('opacity', 0.6);
    }

    if (id === 'bulk-viz') {
        const inputX = 15;
        const inputY = 35;
        const inputW = 180;
        preview.append('rect')
            .attr('x', inputX)
            .attr('y', inputY)
            .attr('width', inputW)
            .attr('height', 90)
            .attr('fill', 'white')
            .attr('stroke', '#e2e8f0')
            .attr('rx', 4)
            .attr('opacity', 0.7);

        const mapX = 215;
        const mapY = 30;
        const mapW = 270;
        const mapH = 235;

        svg.append('defs').append('clipPath')
            .attr('id', 'map-clip-preview')
            .append('rect')
            .attr('x', mapX + 5)
            .attr('y', mapY + 5)
            .attr('width', mapW - 10)
            .attr('height', mapH - 10)
            .attr('rx', 4);

        preview.append('rect')
            .attr('x', mapX)
            .attr('y', mapY)
            .attr('width', mapW)
            .attr('height', mapH)
            .attr('fill', 'white')
            .attr('stroke', '#3b82f6')
            .attr('stroke-width', 2)
            .attr('rx', 6)
            .attr('opacity', 0.6);

        preview.append('image')
            .attr('x', mapX - 11)
            .attr('y', mapY - 246)
            .attr('width', (mapW - 10) * 3.5)
            .attr('height', (mapH - 10) * 3.5)
            .attr('href', 'assets/us-states-map.svg')
            .attr('opacity', 0.25)
            .style('pointer-events', 'none')
            .attr('clip-path', 'url(#map-clip-preview)');
    }

    if (id === 'fast-viz') {
        if (useBasemapPreview) {
            // Show basemap preview
            const panelX = 30;
            const panelY = 50;
            const optionGap = 30;
            const options = ['Default', 'Satellite', 'Plain', 'Custom'];

            preview.append('text')
                .attr('x', panelX)
                .attr('y', panelY - 20)
                .attr('font-size', '12px')
                .attr('font-weight', '600')
                .attr('fill', '#0f172a')
                .attr('opacity', 0.7)
                .text('Basemap options');

            const checkboxes = preview.selectAll('g.preview-option')
                .data(options)
                .enter()
                .append('g')
                .attr('class', 'preview-option')
                .attr('transform', (d, i) => `translate(${panelX},${panelY + i * optionGap})`);

            checkboxes.append('rect')
                .attr('width', 14)
                .attr('height', 14)
                .attr('rx', 2)
                .attr('fill', '#fff')
                .attr('stroke', '#94a3b8')
                .attr('stroke-width', 1)
                .attr('opacity', 0.7);

            checkboxes.append('path')
                .attr('d', 'M3 7 L6 10 L11 3')
                .attr('stroke', '#2563eb')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('stroke-linecap', 'round')
                .attr('stroke-linejoin', 'round')
                .attr('opacity', d => d === 'Plain' ? 0.7 : 0);

            checkboxes.append('text')
                .attr('x', 22)
                .attr('y', 12)
                .attr('font-size', '12px')
                .attr('fill', '#334155')
                .attr('opacity', 0.7)
                .text(d => d);

            // Map frame preview
            const mapX = 200;
            const mapY = 35;
            const mapW = 270;
            const mapH = 200;

            preview.append('rect')
                .attr('x', mapX)
                .attr('y', mapY)
                .attr('width', mapW)
                .attr('height', mapH)
                .attr('rx', 8)
                .attr('fill', '#f8fafc')
                .attr('stroke', '#e2e8f0')
                .attr('opacity', 0.7);

            preview.append('text')
                .attr('x', mapX + mapW / 2)
                .attr('y', mapY + mapH / 2)
                .attr('text-anchor', 'middle')
                .attr('font-size', '13px')
                .attr('fill', '#64748b')
                .attr('opacity', 0.7)
                .text('Map Preview');
        } else {
            // Show speedometer preview
            const centerX = width / 2;
            const centerY = height * 0.55;
            const radius = 95;
            const g = preview.append('g').attr('transform', `translate(${centerX},${centerY})`);
            const arcGenerator = d3.arc();
            const backgroundArc = arcGenerator({
                innerRadius: radius - 10,
                outerRadius: radius,
                startAngle: -Math.PI * 0.75,
                endAngle: Math.PI * 0.75
            });
            g.append('path')
                .attr('d', backgroundArc)
                .attr('fill', '#e5e7eb')
                .attr('opacity', 0.7);

            for (let i = 0; i <= 8; i++) {
                const angle = -Math.PI * 0.75 + (Math.PI * 1.5 / 8) * i;
                const x1 = (radius - 5) * Math.sin(angle);
                const y1 = -(radius - 5) * Math.cos(angle);
                const x2 = (radius + 3) * Math.sin(angle);
                const y2 = -(radius + 3) * Math.cos(angle);
                g.append('line')
                    .attr('x1', x1)
                    .attr('y1', y1)
                    .attr('x2', x2)
                    .attr('y2', y2)
                    .attr('stroke', '#1f2937')
                    .attr('stroke-width', 1.5)
                    .attr('opacity', 0.5);
            }
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    ['connect-viz', 'build-viz', 'refine-viz', 'collab-viz', 'report-viz', 'bulk-viz', 'fast-viz'].forEach(id => {
        renderVizPreview(id);
        document.getElementById(id).classList.add('viz-ready');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

// ===== CONNECT ANIMATION =====
// Table with columns: Zip, Territory, Region, Area, Account, ...
// Rows appear, then connection lines flow to map, pins drop
function createConnectAnimation() {
    const svg = d3.select('#connect-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Table data
    const tableData = [
        { zip: '02108', territory: 'Boston', region: 'Northeast', area: 'East', account: 'Acct 1' },
        { zip: '10001', territory: 'Manhattan', region: 'Northeast', area: 'East', account: 'Acct 2' },
        { zip: '19103', territory: 'Philly', region: 'Mid-Atlantic', area: 'East', account: 'Acct 3' },
        { zip: '20001', territory: 'DC', region: 'Mid-Atlantic', area: 'East', account: 'Acct 4' },
        { zip: '27601', territory: 'Raleigh', region: 'Mid-Atlantic', area: 'East', account: 'Acct 5' },
        { zip: '15222', territory: 'Pittsburgh', region: 'Northeast', area: 'East', account: 'Acct 6' }
    ];

    const tableX = 20;
    const tableY = 68;
    const headerHeight = 22;
    const rowHeight = 18;
    const colWidths = [45, 60, 60, 40, 60, 30];
    const totalTableWidth = colWidths.reduce((a, b) => a + b, 0) + 10;

    // Draw table background
    svg.append('rect')
        .attr('x', tableX)
        .attr('y', tableY)
        .attr('width', totalTableWidth)
        .attr('height', headerHeight + rowHeight * tableData.length)
        .attr('fill', 'white')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 4);

    // Header background
    svg.append('rect')
        .attr('x', tableX)
        .attr('y', tableY)
        .attr('width', totalTableWidth)
        .attr('height', headerHeight)
        .attr('fill', '#f1f5f9')
        .attr('rx', 4);

    // Headers
    const headers = ['Zip', 'Territory', 'Region', 'Area', 'Account', '...'];
    let headerX = tableX + 8;
    headers.forEach((header, i) => {
        svg.append('text')
            .attr('x', headerX)
            .attr('y', tableY + 16)
            .attr('font-size', '11px')
            .attr('font-weight', '600')
            .attr('fill', '#0f172a')
            .text(header);
        headerX += colWidths[i];
    });

    // Table rows - appear one by one
    tableData.forEach((row, idx) => {
        const rowY = tableY + headerHeight + idx * rowHeight;
        
        // Alternating row background
        svg.append('rect')
            .attr('x', tableX)
            .attr('y', rowY)
            .attr('width', totalTableWidth)
            .attr('height', rowHeight)
            .attr('fill', idx % 2 === 0 ? '#f8fafc' : 'white')
            .attr('opacity', 0)
            .transition()
            .delay(idx * 150)
            .duration(300)
            .attr('opacity', 1);

        // Row data (skip zip at index 0 — drawn colored later)
        headerX = tableX + 8;
        const values = [row.zip, row.territory, row.region, row.area, row.account, '...'];
        values.forEach((val, colIdx) => {
            if (colIdx === 0) { headerX += colWidths[colIdx]; return; }
            svg.append('text')
                .attr('x', headerX)
                .attr('y', rowY + 13)
                .attr('font-size', '9px')
                .attr('fill', '#64748b')
                .attr('opacity', 0)
                .text(val)
                .transition()
                .delay(idx * 150)
                .duration(300)
                .attr('opacity', 1);
            headerX += colWidths[colIdx];
        });
    });

    // Connection lines and dots animation
    const mapX = 335;
    const mapY = 50;
    const mapWidth = 155;
    const mapHeight = 170;

    // Map background
    svg.append('rect')
        .attr('x', mapX)
        .attr('y', mapY)
        .attr('width', mapWidth)
        .attr('height', mapHeight)
        .attr('fill', '#ffffff')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 6)
        .attr('opacity', 0)
        .transition()
        .delay(300)
        .duration(400)
        .attr('opacity', 1);

    // Clip path for map image
    svg.append('defs').append('clipPath')
        .attr('id', 'connect-map-clip')
        .append('rect')
        .attr('x', mapX)
        .attr('y', mapY)
        .attr('width', mapWidth)
        .attr('height', mapHeight)
        .attr('rx', 6);

    // Map image (US map) - zoomed to Northeast
    svg.append('image')
        .attr('x', mapX - 370)
        .attr('y', mapY - 73)
        .attr('width', mapWidth * 3.45)
        .attr('height', mapWidth * 3.45 * (593 / 959))
        .attr('href', 'assets/us-states-map.svg')
        .attr('opacity', 0.75)
        .style('pointer-events', 'none')
        .attr('clip-path', 'url(#connect-map-clip)');

    // Pin positions on map
    const mapPins = [
        { x: 456.0, y: 65.3,  color: '#3b82f6' },  // Boston
        { x: 438.9, y: 85.7,  color: '#f97316' },  // Manhattan
        { x: 430.3, y: 101.5, color: '#a855f7' },  // Philly
        { x: 413.0, y: 117.5, color: '#10b981' },  // DC
        { x: 390.2, y: 159.8, color: '#ec4899' },  // Raleigh
        { x: 385.9, y: 102.0, color: '#0ea5e9' }   // Pittsburgh
    ];

    // Color the zip code in each row to match its pin
    tableData.forEach((row, idx) => {
        const rowY = tableY + headerHeight + idx * rowHeight;
        svg.append('text')
            .attr('x', tableX + 8)
            .attr('y', rowY + 13)
            .attr('font-size', '9px')
            .attr('font-weight', '600')
            .attr('fill', mapPins[idx].color)
            .attr('opacity', 0)
            .text(row.zip)
            .transition()
            .delay(idx * 150)
            .duration(300)
            .attr('opacity', 1);
    });

    const getStartPoint = (idx) => ({
        x: tableX + totalTableWidth + 4,
        y: tableY + headerHeight + idx * rowHeight + 9
    });

    const buildPath = (d, idx) => {
        const start = getStartPoint(idx);
        const midX = (start.x + d.x) / 2;
        const midY = Math.min(start.y, d.y) - 8;
        return `M ${start.x},${start.y} Q ${midX},${midY} ${d.x},${d.y}`;
    };

    // Connection lines — animate with each row
    mapPins.forEach((pin, i) => {
        svg.append('path')
            .attr('class', 'connect-line')
            .attr('d', buildPath(pin, i))
            .attr('fill', 'none')
            .attr('stroke', pin.color)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '3,3')
            .attr('opacity', 0)
            .transition()
            .delay(i * 150 + 200)
            .duration(400)
            .attr('opacity', 0.45);
    });

    // Pin dots — white halo + colored fill
    mapPins.forEach((pin, i) => {
        svg.append('circle')
            .attr('cx', pin.x).attr('cy', pin.y)
            .attr('r', 6)
            .attr('fill', 'white')
            .attr('opacity', 0)
            .transition()
            .delay(i * 150 + 400)
            .duration(300)
            .attr('opacity', 1);

        svg.append('circle')
            .attr('class', 'connect-pin')
            .attr('cx', pin.x).attr('cy', pin.y)
            .attr('r', 4.5)
            .attr('fill', pin.color)
            .attr('opacity', 0)
            .transition()
            .delay(i * 150 + 400)
            .duration(300)
            .attr('opacity', 1);
    });
}

// ===== BUILD ANIMATION =====
// Territory Carving: NYC + Long Island zips, freehand lasso carves Nassau → 3rd territory
function createBuildAnimation() {
    const svg = d3.select('#build-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Water background
    svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#dbeafe');

    d3.json('assets/ny-zips-paths.json?v=2').then(data => {
        const features = data.features;
        const hull = data.hull;
        const cities = data.cities;

        const nycColor = '#3b82f6', liColor = '#f97316', carveColor = '#10b981', ctxColor = '#cbd5e1';

        const getColor = p => p.g === 'nyc' ? nycColor : p.g === 'longisland' ? liColor : ctxColor;

        // Draw zip paths — stroke = fill hides internal territory borders
        svg.selectAll('.build-path')
            .data(features)
            .enter()
            .append('path')
            .attr('class', 'build-path')
            .attr('d', p => p.d)
            .attr('fill', getColor)
            .attr('stroke', getColor)
            .attr('stroke-width', 0.5)
            .attr('opacity', 0)
            .transition().duration(800).attr('opacity', 1);

        // City dots + labels (Google-Maps style)
        const cityG = svg.selectAll('.city-group')
            .data(cities).enter().append('g').attr('class', 'city-group')
            .attr('opacity', 0)
            .attr('transform', d => `translate(${d.x},${d.y})`);

        // Single dot (Google Maps style — matches bulk ops viz)
        cityG.append('circle').attr('r', 2.5).attr('fill', '#ffffff').attr('stroke', '#5f6368').attr('stroke-width', 1.2);
        // Label to the right with white halo
        cityG.append('text')
            .attr('x', 5).attr('y', 3.5)
            .attr('text-anchor', 'start')
            .attr('font-family', 'Roboto, Arial, sans-serif')
            .attr('font-size', '8px')
            .attr('font-weight', '500')
            .attr('fill', '#3c4043')
            .attr('paint-order', 'stroke')
            .attr('stroke', 'white').attr('stroke-width', 2.5).attr('stroke-linejoin', 'round')
            .text(d => d.name);

        cityG.transition().delay(600).duration(500).attr('opacity', 1);

        // Territory name labels — larger/bolder than city labels (Google Maps zoom-level style)
        const territoryLabels = [
            { name: 'New York City', x: 50,  y: 72,  color: nycColor },
            { name: 'Long Island',   x: 330, y: 125, color: liColor  },
        ];
        territoryLabels.forEach(t => {
            svg.append('text')
                .attr('x', t.x).attr('y', t.y)
                .attr('text-anchor', 'middle')
                .attr('font-family', 'Roboto, Arial, sans-serif')
                .attr('font-size', '13px')
                .attr('font-weight', '700')
                .attr('letter-spacing', '0.3px')
                .attr('fill', 'white')
                .attr('paint-order', 'stroke')
                .attr('stroke', t.color).attr('stroke-width', 3).attr('stroke-linejoin', 'round')
                .attr('opacity', 0)
                .text(t.name)
                .transition().delay(200).duration(600).attr('opacity', 0.9);
        });

        // Green territory label — only appears after carve completes
        const carveLabelEl = svg.append('text')
            .attr('x', 148).attr('y', 118)
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Roboto, Arial, sans-serif')
            .attr('font-size', '13px')
            .attr('font-weight', '700')
            .attr('letter-spacing', '0.3px')
            .attr('fill', 'white')
            .attr('paint-order', 'stroke')
            .attr('stroke', carveColor).attr('stroke-width', 3).attr('stroke-linejoin', 'round')
            .attr('opacity', 0)
            .text('New Territory');

        // Lasso: convex hull of carve zone boundary, drawn with catmull-rom smoothing
        const lassoLine = d3.line().curve(d3.curveCatmullRomClosed).x(d => d[0]).y(d => d[1]);
        const lassoEl = svg.append('path')
            .attr('d', lassoLine(hull))
            .attr('fill', 'rgba(15,23,42,0.06)')
            .attr('stroke', '#1e293b')
            .attr('stroke-width', 2)
            .attr('opacity', 0);

        const lassoLen = lassoEl.node().getTotalLength();
        lassoEl.attr('stroke-dasharray', `${lassoLen} ${lassoLen}`).attr('stroke-dashoffset', lassoLen);

        // Animation sequence
        setTimeout(() => {
            lassoEl.attr('opacity', 1).transition().duration(1400).ease(d3.easeLinear).attr('stroke-dashoffset', 0);

            // Zip outlines flash white while lasso draws (400ms in)
            setTimeout(() => {
                svg.selectAll('.build-path').filter(d => d.carve)
                    .transition().duration(400).attr('stroke', 'white').attr('stroke-width', 1.2);
            }, 400);

            // After lasso completes: carve zone turns green, territory label fades in
            setTimeout(() => {
                svg.selectAll('.build-path').filter(d => d.carve)
                    .transition().duration(700)
                    .attr('fill', carveColor).attr('stroke', carveColor).attr('stroke-width', 0.5);
                carveLabelEl.transition().delay(400).duration(600).attr('opacity', 0.9);
                setTimeout(() => lassoEl.transition().duration(600).attr('opacity', 0), 900);
            }, 1600);
        }, 900);
    });
}

// ===== REFINE ANIMATION =====
function createRefineAnimation() {
    const svg = d3.select('#refine-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = { top: 50, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Chart data - steep early drop, long flat midsection, then sharper decline
    const chartData = [
        { name: 'Greater Los Angeles',  value: 1380 },
        { name: 'Bay Area South',        value: 1310 },
        { name: 'New York City',         value: 1215 },
        { name: 'Chicago North',         value: 1170 },
        { name: 'Dallas Metro',          value: 1145 },
        { name: 'Houston East',          value: 1125 },
        { name: 'Washington DC',         value: 1110 },
        { name: 'Boston Metro',          value: 1095 },
        { name: 'Seattle Metro',         value: 1085 },
        { name: 'Atlanta Metro',         value: 1075 },
        { name: 'Phoenix Metro',         value: 1065 },
        { name: 'Philadelphia',          value: 1055 },
        { name: 'Miami South',           value: 1048 },
        { name: 'Denver Metro',          value: 1042 },
        { name: 'Minneapolis',           value: 1038 },
        { name: 'San Diego',             value: 1035 },
        { name: 'Portland OR',           value: 1032 },
        { name: 'Detroit Metro',         value: 1030 },
        { name: 'Las Vegas',             value: 1028 },
        { name: 'St. Louis',             value: 1025 },
        { name: 'Austin Metro',          value: 1018 },
        { name: 'Nashville',             value: 1005 },
        { name: 'Charlotte',             value: 980 },
        { name: 'San Antonio',           value: 955 },
        { name: 'Indianapolis',          value: 910 },
        { name: 'Cleveland',             value: 875 },
        { name: 'Cincinnati',            value: 840 },
        { name: 'Pittsburgh',            value: 800 },
        { name: 'Memphis',               value: 730 },
        { name: 'New Orleans',           value: 650 }
    ];

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, chartData.length - 1])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([600, 1450])
        .range([chartHeight, 0]);

    // Mid band (balanced zone)
    g.append('rect')
        .attr('x', 0)
        .attr('y', yScale(1200))
        .attr('width', chartWidth)
        .attr('height', yScale(800) - yScale(1200))
        .attr('fill', '#22c55e')
        .attr('opacity', 0.08)
        .attr('rx', 2);

    // Y-axis
    const yAxis = g.append('g')
        .attr('opacity', 0)
        .call(d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(-chartWidth)
            .tickFormat(d => d))
        .transition()
        .duration(400)
        .attr('opacity', 0.4);

    yAxis.selectAll('.domain').remove();
    yAxis.selectAll('line').attr('stroke', '#dbeafe').attr('stroke-width', 0.7);
    yAxis.selectAll('text').attr('fill', '#2563eb').attr('font-weight', 500);

    // Y-axis label
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', '500')
        .attr('fill', '#64748b')
        .attr('opacity', 0)
        .text('Alignment Index')
        .transition()
        .duration(400)
        .attr('opacity', 1);

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('font-weight', '600')
        .attr('fill', '#0f172a')
        .text('Territory Alignment Index');

    // Line generator
    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);

    // Path element for the line
    const path = g.append('path')
        .datum(chartData)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2.5)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('d', line)
        .attr('opacity', 0);

    // Animate line draw
    const pathLength = path.node().getTotalLength();
    path
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(2000)
        .attr('stroke-dashoffset', 0)
        .attr('opacity', 1);

    // Data points
    g.selectAll('.dot')
        .data(chartData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', d => yScale(d.value))
        .attr('r', 0)
        .attr('fill', d => {
            if (d.value > 1200) {
                return '#f59e0b';
            }
            if (d.value < 800) {
                return '#f97316';
            }
            return '#22c55e';
        })
        .transition()
        .delay((d, i) => 1800 + i * 30)
        .duration(400)
        .attr('r', 4)
        .attr('opacity', 0.9)
        .on('end', function(d) {
            // Add hover interactions
            d3.select(this)
                .on('mouseenter', function() {
                    d3.select(this)
                        .transition()
                        .duration(150)
                        .attr('r', 6)
                        .attr('opacity', 1);

                    // Show tooltip — 2-line for edge dots to avoid clipping
                    const cx = +d3.select(this).attr('cx');
                    const cy = +d3.select(this).attr('cy');
                    const isFirst = d.name === 'Greater Los Angeles';
                    const isLast  = d.name === 'New Orleans';
                    const anchor  = isFirst ? 'start' : isLast ? 'end' : 'middle';
                    const tip = g.append('text')
                        .attr('class', 'tooltip')
                        .attr('x', cx)
                        .attr('y', cy - (isFirst || isLast ? 20 : 12))
                        .attr('text-anchor', anchor)
                        .attr('font-size', '10px')
                        .attr('font-weight', '600')
                        .attr('fill', '#0f172a');
                    if (isFirst || isLast) {
                        tip.append('tspan').attr('x', cx).attr('dy', 0).text(d.name);
                        tip.append('tspan').attr('x', cx).attr('dy', '1.3em').text(`(${d.value})`);
                    } else {
                        tip.text(`${d.name} (${d.value})`);
                    }
                })
                .on('mouseleave', function() {
                    d3.select(this)
                        .transition()
                        .duration(150)
                        .attr('r', 4)
                        .attr('opacity', 0.9);

                    g.selectAll('.tooltip').remove();
                });
        });
}

// ===== COLLABORATION VISUALIZATION =====
// Horizontal layout: users on left, lines converge, line extends to map on right
function createCollaborationViz() {
    const svg = d3.select('#collab-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Users on the left — spread across full height
    const users = [
        { y: 50, color: '#3b82f6', label: 'A' },
        { y: 140, color: '#f97316', label: 'B' },
        { y: 230, color: '#a855f7', label: 'C' }
    ];

    const userX = 50;
    const centerX = 160;
    const centerY = 140;
    const mapX = 220;
    const mapWidth = 280;
    const mapHeight = 240;

    // Draw user circles
    users.forEach((user, idx) => {
        svg.append('circle')
            .attr('cx', userX)
            .attr('cy', user.y)
            .attr('r', 22)
            .attr('fill', user.color)
            .attr('opacity', 0)
            .transition()
            .delay(idx * 150)
            .duration(400)
            .attr('opacity', 1);

        // Draw person icon - head and shoulders
        // Head
        svg.append('circle')
            .attr('cx', userX)
            .attr('cy', user.y - 8)
            .attr('r', 6)
            .attr('fill', 'white')
            .attr('opacity', 0)
            .transition()
            .delay(idx * 150)
            .duration(400)
            .attr('opacity', 1);

        // Shoulders (oval)
        svg.append('ellipse')
            .attr('cx', userX)
            .attr('cy', user.y + 5)
            .attr('rx', 10)
            .attr('ry', 6)
            .attr('fill', 'white')
            .attr('opacity', 0)
            .transition()
            .delay(idx * 150)
            .duration(400)
            .attr('opacity', 1);
    });

    // Lines from users to center point
    users.forEach((user, idx) => {
        // Lighten the colors by mixing with white
        const lightColors = {
            '#3b82f6': '#7ba9f7',  // Light blue
            '#f97316': '#faa05a',  // Light orange
            '#a855f7': '#c484f9'   // Light purple
        };
        
        svg.append('line')
            .attr('x1', userX + 22)
            .attr('y1', user.y)
            .attr('x2', centerX)
            .attr('y2', centerY)
            .attr('stroke', lightColors[user.color])
            .attr('stroke-width', 3)
            .attr('opacity', 0)
            .transition()
            .delay(600 + idx * 150)
            .duration(500)
            .attr('opacity', 1);
    });

    // Center connection point — pulsing ring + solid dot
    svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 10)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('opacity', 0)
        .transition()
        .delay(1100)
        .duration(400)
        .attr('opacity', 0.4)
        .selection()
        .transition()
        .duration(900)
        .ease(d3.easeSinInOut)
        .attr('r', 16)
        .attr('opacity', 0)
        .on('end', function repeat() {
            d3.select(this)
                .attr('r', 10)
                .attr('opacity', 0.4)
                .transition()
                .duration(900)
                .ease(d3.easeSinInOut)
                .attr('r', 16)
                .attr('opacity', 0)
                .on('end', repeat);
        });

    svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 8)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .transition()
        .delay(1100)
        .duration(400)
        .attr('opacity', 1);

    // Line to map (points to middle of map)
    const mapMidX = mapX + (mapWidth / 2);
    const mapMidY = centerY;
    svg.append('line')
        .attr('x1', centerX + 6)
        .attr('y1', centerY)
        .attr('x2', mapMidX)
        .attr('y2', mapMidY)
        .attr('stroke', '#9ca3af')
        .attr('stroke-width', 3)
        .attr('opacity', 0)
        .transition()
        .delay(1500)
        .duration(500)
        .attr('opacity', 1);

    // Map container - removed grey box
    
    // Load actual US map with TopoJSON (same as coloring tool)
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
        .then(r => r.json())
        .then(us => {
            const states = topojson.feature(us, us.objects.states);
            
            // Create projection sized for the map area
            const projection = d3.geoAlbersUsa()
                .fitSize([mapWidth - 10, mapHeight - 10], states);
            
            const path = d3.geoPath().projection(projection);

            // State color mapping from coloring tool
            const stateColors = {
                "10": "#8b5cf6",
                "12": "#10b981",
                "13": "#10b981",
                "15": "#3b82f6",
                "16": "#3b82f6",
                "17": "#f59e0b",
                "18": "#f59e0b",
                "19": "#f59e0b",
                "20": "#f59e0b",
                "21": "#f59e0b",
                "22": "#10b981",
                "23": "#8b5cf6",
                "24": "#8b5cf6",
                "25": "#8b5cf6",
                "26": "#f59e0b",
                "27": "#f59e0b",
                "28": "#10b981",
                "29": "#f59e0b",
                "30": "#3b82f6",
                "31": "#f59e0b",
                "32": "#3b82f6",
                "33": "#8b5cf6",
                "34": "#8b5cf6",
                "35": "#3b82f6",
                "36": "#8b5cf6",
                "37": "#10b981",
                "38": "#f59e0b",
                "39": "#f59e0b",
                "40": "#10b981",
                "41": "#3b82f6",
                "42": "#8b5cf6",
                "44": "#8b5cf6",
                "45": "#10b981",
                "46": "#f59e0b",
                "47": "#10b981",
                "48": "#10b981",
                "49": "#3b82f6",
                "50": "#8b5cf6",
                "51": "#8b5cf6",
                "53": "#3b82f6",
                "54": "#8b5cf6",
                "55": "#f59e0b",
                "56": "#3b82f6",
                "06": "#3b82f6",
                "04": "#3b82f6",
                "08": "#3b82f6",
                "05": "#10b981",
                "01": "#10b981",
                "09": "#8b5cf6",
                "02": "#3b82f6"
            };



            // Create map group at correct position
            const mapGroupY = centerY - (mapHeight / 2);
            const mapGroup = svg.append('g')
                .attr('transform', `translate(${mapX},${mapGroupY})`);

            // Draw each state
            mapGroup.selectAll('path')
                .data(states.features)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => stateColors[String(d.id).padStart(2, '0')] || '#e8e8e8')
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5);

        })
        .catch(err => {
            console.error('Map failed:', err);
            // Fallback to simple colored boxes
            const mapGroup = svg.append('g')
                .attr('transform', `translate(${mapX},${centerY - 45})`);
            mapGroup.append('rect')
                .attr('width', mapWidth - 10)
                .attr('height', mapHeight - 10)
                .attr('fill', '#e8f4f8');
            mapGroup.append('rect')
                .attr('x', 5)
                .attr('y', 25)
                .attr('width', 25)
                .attr('height', 80)
                .attr('fill', '#3b82f6')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
            mapGroup.append('rect')
                .attr('x', 35)
                .attr('y', 10)
                .attr('width', 180)
                .attr('height', 130)
                .attr('fill', '#f59e0b')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1);
        });
}

// ===== AUTOMATED REPORTING - POWERPOINT SLIDE =====
function createReportingViz() {
    const svg = d3.select('#report-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Slide background (16:9 aspect ratio)
    svg.append('rect')
        .attr('x', 10)
        .attr('y', 10)
        .attr('width', width - 20)
        .attr('height', height - 20)
        .attr('fill', 'white')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 2)
        .attr('rx', 6)
        .attr('opacity', 0)
        .transition()
        .duration(400)
        .attr('opacity', 1);

    // Title "West Area"
    svg.append('text')
        .attr('x', 30)
        .attr('y', 40)
        .attr('font-size', '22px')
        .attr('font-weight', '700')
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .text('West Area')
        .transition()
        .delay(300)
        .duration(400)
        .attr('opacity', 1);

    // Map on left (zoomed to west area only) - colored by region from table
    const mapX = 15;
    const mapY = 65;
    const mapW = 145;
    const mapH = 165;

    // Load actual US map with TopoJSON - zoomed to western region
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
        .then(r => r.json())
        .then(us => {
            const states = topojson.feature(us, us.objects.states);
            
            // Filter to only western states
            const westernFIPS = ['02', '04', '06', '08', '15', '16', '30', '32', '35', '41', '49', '53', '56'];
            const westernStates = states.features.filter(d => 
                westernFIPS.includes(String(d.id).padStart(2, '0'))
            );
            const westernCollection = { type: 'FeatureCollection', features: westernStates };
            
            // Create projection zoomed to western states
            const projection = d3.geoAlbersUsa()
                .fitSize([mapW, mapH], westernCollection);
            
            const path = d3.geoPath().projection(projection);

            // State to region mapping based on table regions
            const regionMap = {
                '53': 'Pacific Northwest', // Washington
                '41': 'Pacific Northwest', // Oregon
                '16': 'Pacific Northwest', // Idaho
                '06': 'California',        // California
                '32': 'Southwest',         // Nevada
                '30': 'Mountain West',     // Montana
                '56': 'Mountain West',     // Wyoming
                '08': 'Mountain West',     // Colorado
                '49': 'Mountain West',     // Utah
                '04': 'Southwest',         // Arizona
                '35': 'Southwest',         // New Mexico
                '15': 'Pacific Northwest', // Hawaii
                '02': 'Pacific Northwest'  // Alaska
            };

            // Region colors
            const regionColors = {
                'Pacific Northwest': '#3b82f6', // Blue
                'California': '#10b981',        // Green
                'Mountain West': '#c8ad86',     // Beige brown
                'Southwest': '#f59e0b'          // Orange
            };

            // Create map group at correct position
            const mapGroup = svg.append('g')
                .attr('transform', `translate(${mapX},${mapY})`);

            // Draw each western state colored by region
            mapGroup.selectAll('path')
                .data(westernStates)
                .enter()
                .append('path')
                .attr('d', path)
                .attr('fill', d => {
                    const fips = String(d.id).padStart(2, '0');
                    const region = regionMap[fips];
                    return region ? regionColors[region] : '#e8e8e8';
                })
                .attr('stroke', '#fff')
                .attr('stroke-width', 0.5);

            // Region labels
            const regionLabels = [
                { name: 'Pacific Northwest', fips: '41', dx: 0, dy: 0 }, // Oregon
                { name: 'California', fips: '06', dx: 0, dy: 0 },
                { name: 'Mountain West', fips: '49', dx: 6, dy: 0 },     // Utah
                { name: 'Southwest', fips: '04', dx: 0, dy: 0 }          // Arizona
            ];

            mapGroup.selectAll('text.region-label')
                .data(regionLabels)
                .enter()
                .append('text')
                .attr('class', 'region-label')
                .attr('x', d => {
                    const feature = westernStates.find(s => String(s.id).padStart(2, '0') === d.fips);
                    return feature ? path.centroid(feature)[0] + (d.dx || 0) : 0;
                })
                .attr('y', d => {
                    const feature = westernStates.find(s => String(s.id).padStart(2, '0') === d.fips);
                    return feature ? path.centroid(feature)[1] + (d.dy || 0) : 0;
                })
                .attr('text-anchor', 'middle')
                .attr('font-size', '7px')
                .attr('font-weight', '600')
                .attr('font-family', 'Roboto, Arial, sans-serif')
                .attr('fill', '#0f172a')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 2)
                .attr('paint-order', 'stroke')
                .attr('opacity', 0.9)
                .text(d => d.name);

        });

    // Table on right
    const tableX = 165;
    const tableY = 52;
    const colWidths = [85, 40, 55, 30, 65];

    // Region data
    const regions = [
        { name: 'Pacific Northwest', soc: '5', accts: '245', ellipsis: '...', index: '1,008' },
        { name: 'California', soc: '5', accts: '510', ellipsis: '...', index: '1,006' },
        { name: 'Mountain West', soc: '4', accts: '156', ellipsis: '...', index: '1,002' },
        { name: 'Southwest', soc: '6', accts: '456', ellipsis: '...', index: '1,001' }
    ];

    const tableRows = regions.length + 2; // header + total
    const tableHeight = 154;
    const rowHeight = tableHeight / tableRows;

    // Table background
    svg.append('rect')
        .attr('x', tableX)
        .attr('y', tableY)
        .attr('width', 275)
        .attr('height', tableHeight)
        .attr('fill', 'white')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 3);

    // Headers
    const headers = ['Region Name', 'SoC', '#Accts', '...', 'Avg Index'];
    let hX = tableX + 6;
    headers.forEach((header, i) => {
        svg.append('text')
            .attr('x', i === 0 ? hX : hX + colWidths[i] / 2 - 6)
            .attr('y', tableY + rowHeight - 6)
            .attr('font-size', '11px')
            .attr('font-weight', '600')
            .attr('fill', '#0f172a')
            .attr('text-anchor', i === 0 ? 'start' : 'middle')
            .attr('opacity', 0)
            .text(header)
            .transition()
            .delay(500)
            .duration(300)
            .attr('opacity', 1);
        hX += colWidths[i];
    });

    regions.forEach((region, idx) => {
        const rowY = tableY + rowHeight + idx * rowHeight;
        
        // Alternating background
        svg.append('rect')
            .attr('x', tableX)
            .attr('y', rowY - 2)
            .attr('width', 275)
            .attr('height', rowHeight)
            .attr('fill', idx % 2 === 0 ? '#f8fafc' : 'white')
            .attr('opacity', 0)
            .transition()
            .delay(600 + idx * 80)
            .duration(300)
            .attr('opacity', 1);

        // Data
        hX = tableX + 6;
        const values = [region.name, region.soc, region.accts, region.ellipsis, region.index];
        values.forEach((val, colIdx) => {
            svg.append('text')
                .attr('x', colIdx === 0 ? hX : hX + colWidths[colIdx] / 2 - 6)
                .attr('y', rowY + rowHeight * 0.6)
                .attr('font-size', '10px')
                .attr('fill', '#64748b')
                .attr('text-anchor', colIdx === 0 ? 'start' : 'middle')
                .attr('opacity', 0)
                .text(val)
                .transition()
                .delay(600 + idx * 80)
                .duration(300)
                .attr('opacity', 1);
            hX += colWidths[colIdx];
        });
    });

    // Average row (blue, inside table)
    const avgRowY = tableY + rowHeight + regions.length * rowHeight;

    const totalAccts = regions.reduce((sum, r) => sum + parseInt(r.accts.replace(',', '')), 0);
    const avgAccts = Math.round(totalAccts / regions.length);
    const avgSoC = Math.round(regions.reduce((sum, r) => sum + parseInt(r.soc), 0) / regions.length);
    const avgIndex = Math.round(regions.reduce((sum, r) => sum + parseInt(r.index.replace(',', '')), 0) / regions.length);

    svg.append('rect')
        .attr('x', tableX)
        .attr('y', avgRowY - 2)
        .attr('width', 275)
        .attr('height', rowHeight)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .transition()
        .delay(1100)
        .duration(300)
        .attr('opacity', 0.08);

    const avgValues = ['Area Average', avgSoC.toString(), avgAccts.toLocaleString(), '...', avgIndex.toLocaleString()];
    hX = tableX + 6;
    avgValues.forEach((val, colIdx) => {
        svg.append('text')
            .attr('x', colIdx === 0 ? hX : hX + colWidths[colIdx] / 2 - 6)
            .attr('y', avgRowY + rowHeight * 0.6)
            .attr('font-size', '10px')
            .attr('font-weight', '600')
            .attr('fill', '#3b82f6')
            .attr('text-anchor', colIdx === 0 ? 'start' : 'middle')
            .attr('opacity', 0)
            .text(val)
            .transition()
            .delay(1100)
            .duration(300)
            .attr('opacity', 1);
        hX += colWidths[colIdx];
    });

    // Totals row (grey, below table border)
    const totalsY = tableY + tableHeight + 14;
    const totalValues = ['Area Total', regions.length.toString(), totalAccts.toLocaleString(), '...', '21,353'];
    hX = tableX + 6;
    totalValues.forEach((val, colIdx) => {
        svg.append('text')
            .attr('x', colIdx === 0 ? hX : hX + colWidths[colIdx] / 2 - 6)
            .attr('y', totalsY)
            .attr('font-size', '10px')
            .attr('font-weight', colIdx === 0 ? '600' : '400')
            .attr('fill', '#94a3b8')
            .attr('text-anchor', colIdx === 0 ? 'start' : 'middle')
            .attr('opacity', 0)
            .text(val)
            .transition()
            .delay(1300)
            .duration(300)
            .attr('opacity', 1);
        hX += colWidths[colIdx];
    });

    // PowerPoint logo (bottom left)
    svg.append('image')
        .attr('x', 15)
        .attr('y', height - 35)
        .attr('width', 26)
        .attr('height', 26)
        .attr('href', 'https://img.icons8.com/fluency/512/microsoft-powerpoint-2019.png')
        .attr('opacity', 0)
        .transition()
        .delay(1400)
        .duration(300)
        .attr('opacity', 1);
}

// ===== POWERFUL BULK OPERATIONS =====
// Nevada dots blue, Utah dots turn red on button click
function createBulkOpsViz() {
    const svg = d3.select('#bulk-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Input section on left — full height to match map
    const inputX = 15;
    const inputW = 185;
    const zipBoxY = 30;
    const zipBoxH = 162;

    // Zip list box
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', zipBoxY)
        .attr('width', inputW)
        .attr('height', zipBoxH)
        .attr('fill', 'white')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 4)
        .attr('opacity', 0)
        .transition().duration(300).attr('opacity', 1);

    // Placeholder label
    svg.append('text')
        .attr('x', inputX + 8)
        .attr('y', zipBoxY + 14)
        .attr('font-size', '9.5px')
        .attr('fill', '#94a3b8')
        .attr('opacity', 0)
        .text('Paste zips here...')
        .transition().duration(300).attr('opacity', 1);

    // Count badge top-right
    svg.append('text')
        .attr('x', inputX + inputW - 8)
        .attr('y', zipBoxY + 14)
        .attr('text-anchor', 'end')
        .attr('font-size', '9px')
        .attr('fill', '#3b82f6')
        .attr('font-weight', '600')
        .attr('opacity', 0)
        .text('301 zips')
        .transition().delay(600).duration(300).attr('opacity', 1);

    // Divider line under header
    svg.append('line')
        .attr('x1', inputX + 1).attr('x2', inputX + inputW - 1)
        .attr('y1', zipBoxY + 20).attr('y2', zipBoxY + 20)
        .attr('stroke', '#e2e8f0').attr('stroke-width', 0.5)
        .attr('opacity', 0)
        .transition().duration(300).attr('opacity', 1);

    // Zip codes — 12 visible rows (Oakland/East Bay) to convey large list
    const zips = ['94601','94602','94603','94605','94606','94607','94608','94609','94610','94611','94612','94618'];
    zips.forEach((zip, idx) => {
        svg.append('text')
            .attr('x', inputX + 8)
            .attr('y', zipBoxY + 31 + idx * 11)
            .attr('font-size', '9px')
            .attr('fill', '#0f172a')
            .attr('opacity', 0)
            .text(zip)
            .transition()
            .delay(idx * 60)
            .duration(250)
            .attr('opacity', 1);
    });

    // Subtle scrollbar to suggest more content
    svg.append('rect')
        .attr('x', inputX + inputW - 5)
        .attr('y', zipBoxY + 22)
        .attr('width', 3)
        .attr('height', zipBoxH - 24)
        .attr('fill', '#e2e8f0')
        .attr('rx', 2)
        .attr('opacity', 0)
        .transition().duration(300).attr('opacity', 1);
    svg.append('rect')
        .attr('x', inputX + inputW - 5)
        .attr('y', zipBoxY + 22)
        .attr('width', 3)
        .attr('height', 28)
        .attr('fill', '#94a3b8')
        .attr('rx', 2)
        .attr('opacity', 0)
        .transition().duration(300).attr('opacity', 1);

    // Territory label
    svg.append('text')
        .attr('x', inputX)
        .attr('y', zipBoxY + zipBoxH + 16)
        .attr('font-size', '9.5px')
        .attr('fill', '#64748b')
        .attr('opacity', 0)
        .text('Assign to:')
        .transition().delay(700).duration(300).attr('opacity', 1);

    // Territory input
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', zipBoxY + zipBoxH + 20)
        .attr('width', inputW)
        .attr('height', 22)
        .attr('fill', '#f8fafc')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .attr('opacity', 0)
        .transition().delay(700).duration(300).attr('opacity', 1);

    svg.append('text')
        .attr('x', inputX + 8)
        .attr('y', zipBoxY + zipBoxH + 33)
        .attr('font-size', '9px')
        .attr('fill', '#0f172a')
        .attr('opacity', 0)
        .text('Territory B')
        .transition().delay(700).duration(300).attr('opacity', 1);

    // Assign button
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', zipBoxY + zipBoxH + 50)
        .attr('width', inputW)
        .attr('height', 26)
        .attr('fill', '#3b82f6')
        .attr('stroke', 'none')
        .attr('rx', 4)
        .attr('opacity', 0)
        .transition().delay(900).duration(300).attr('opacity', 1);

    svg.append('text')
        .attr('x', inputX + inputW / 2)
        .attr('y', zipBoxY + zipBoxH + 67)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .attr('opacity', 0)
        .text('Assign')
        .transition().delay(900).duration(300).attr('opacity', 1);

    // Map container on right
    const mapX = 215;
    const mapY = 30;
    const mapW = 270;
    const mapH = 235;

    // Define clip path for map
    svg.append('defs').append('clipPath')
        .attr('id', 'map-clip')
        .append('rect')
        .attr('x', mapX + 5)
        .attr('y', mapY + 5)
        .attr('width', mapW - 10)
        .attr('height', mapH - 10)
        .attr('rx', 4);

    svg.append('rect')
        .attr('x', mapX)
        .attr('y', mapY)
        .attr('width', mapW)
        .attr('height', mapH)
        .attr('fill', '#dbeafe')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('rx', 6)
        .attr('opacity', 1);

    // Pre-computed pixel paths (same approach as build viz / NY map).
    // Python script fitted Mercator to core features, projected all ZCTAs + Marin polygon to SVG pixels.
    // Water (SF Bay, Pacific) shows as #dbeafe background through gaps in ZCTA coverage.
    nvUtZipsPromise.then(data => {
        const fillFeature  = data.features.filter(f => f.g === 'land_fill');
        const landFeatures = data.features.filter(f => f.g === 'land');
        const nvFeatures   = data.features.filter(f => f.g === 'peninsula');
        const utFeatures   = data.features.filter(f => f.g === 'eastbay');

        const mapGroup = svg.append('g').attr('clip-path', 'url(#map-clip)');

        // 1. Blue background — water shows through wherever no land exists.
        mapGroup.append('rect')
            .attr('x', mapX + 5).attr('y', mapY + 5)
            .attr('width', mapW - 10).attr('height', mapH - 10)
            .attr('fill', '#dbeafe');

        // 2. Dissolved land fill — union of all ZIPs, solid grey with no gaps.
        //    Plugs holes in areas where ZIP polygons don't tile perfectly.
        fillFeature.forEach(p => {
            mapGroup.append('path').attr('d', p.d)
                .attr('fill', '#cbd5e1').attr('stroke', 'none')
                .attr('opacity', 0).transition().delay(300).duration(400).attr('opacity', 1);
        });

        // 3. Individual ZIP outlines drawn over the fill.
        landFeatures.forEach(p => {
            mapGroup.append('path').attr('d', p.d)
                .attr('fill', '#cbd5e1').attr('stroke', '#b0bec5').attr('stroke-width', 0.3)
                .attr('opacity', 0).transition().delay(300).duration(400).attr('opacity', 1);
        });

        // 3. Peninsula — blue overlaid on grey base, staggered fade-in
        nvFeatures.forEach((p, idx) => {
            mapGroup.append('path').attr('d', p.d)
                .attr('fill', '#3b82f6').attr('fill-opacity', 0)
                .attr('stroke', '#1d4ed8').attr('stroke-width', 0.7).attr('stroke-opacity', 0)
                .transition().delay(600 + (idx / nvFeatures.length) * 500).duration(300)
                .attr('fill-opacity', 0.55).attr('stroke-opacity', 0.7);
        });

        // 4. East Bay — blue then turns red on "Assign", staggered fade-in
        utFeatures.forEach((p, idx) => {
            mapGroup.append('path').attr('d', p.d)
                .attr('fill', '#3b82f6').attr('fill-opacity', 0)
                .attr('stroke', '#1d4ed8').attr('stroke-width', 0.7).attr('stroke-opacity', 0)
                .transition().delay(1100 + (idx / utFeatures.length) * 500).duration(300)
                .attr('fill-opacity', 0.55).attr('stroke-opacity', 0.7)
                .transition().delay(1800).duration(700)
                .attr('fill', '#ef4444').attr('stroke', '#b91c1c');
        });

        // 5. City labels — Google Maps style: Roboto, dot only (no outer ring), label right of dot
        const cityG = mapGroup.selectAll('.bulk-city')
            .data(data.cities).enter()
            .append('g').attr('class', 'bulk-city')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            .attr('opacity', 0);
        cityG.append('circle').attr('r', 2.5).attr('fill', '#ffffff').attr('stroke', '#5f6368').attr('stroke-width', 1.2);
        cityG.append('text')
            .attr('x', 5).attr('y', 3.5)
            .attr('text-anchor', 'start')
            .attr('font-family', 'Roboto, Arial, sans-serif')
            .attr('font-size', '8px').attr('font-weight', '500')
            .attr('fill', '#3c4043')
            .attr('paint-order', 'stroke')
            .attr('stroke', 'white').attr('stroke-width', 2.5).attr('stroke-linejoin', 'round')
            .text(d => d.name);
        cityG.transition().delay(900).duration(500).attr('opacity', 1);
    });
}

// ===== LIGHTNING FAST - SPEEDOMETER =====
function createSpeedometerViz() {
    const svg = d3.select('#fast-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const centerX = width / 2;
    const centerY = height * 0.55;
    const radius = 95;

    // Create a group for all speedometer elements
    const speedometerGroup = svg.append('g')
        .attr('transform', `translate(${centerX},${centerY})`);

    // Background arc (full range)
    const arcGenerator = d3.arc();
    const backgroundArc = arcGenerator({
        innerRadius: radius - 10,
        outerRadius: radius,
        startAngle: -Math.PI * 0.75,  // Left side
        endAngle: Math.PI * 0.75      // Right side
    });

    speedometerGroup.append('path')
        .attr('d', backgroundArc)
        .attr('fill', '#e5e7eb')
        .attr('opacity', 0)
        .transition()
        .duration(400)
        .attr('opacity', 1);

    // Set needle to initial start position (135 degrees - where animation starts)
    const startAngle = Math.PI * 0.75;   // 135 degrees
    const endAngle = Math.PI * 0.25;     // 45 degrees
    const initialX2 = (radius - 5) * Math.cos(startAngle);
    const initialY2 = (radius - 5) * Math.sin(startAngle);

    // Needle line (initially pointing at animation start angle)
    const needle = speedometerGroup.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', initialX2)
        .attr('y2', initialY2)
        .attr('stroke', '#1f2937')
        .attr('stroke-width', 3)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 1);

    // Animated active arc (fills as needle sweeps)
    const activePath = speedometerGroup.append('path')
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .transition()
        .duration(400)
        .attr('opacity', 1);

    // Start needle sweep animation immediately using D3 transition
    const animationDuration = 1500;  // Faster animation
    
    needle
        .transition()
        .duration(animationDuration)
        .ease(d3.easeLinear)  // Linear to match arc exactly
        .attrTween('x2', function() {
            return function(t) {
                const currentAngle = startAngle + (endAngle - startAngle + 2 * Math.PI) * t;
                return (radius - 5) * Math.cos(currentAngle);
            };
        })
        .attrTween('y2', function() {
            return function(t) {
                const currentAngle = startAngle + (endAngle - startAngle + 2 * Math.PI) * t;
                return (radius - 5) * Math.sin(currentAngle);
            };
        });

    // Also animate the arc using attrTween - fill along speedometer as needle moves
    activePath
        .transition()
        .duration(animationDuration * 0.875)  // One tick mark faster (7/8 of duration)
        .ease(d3.easeLinear)  // Linear to match needle exactly
        .attrTween('d', function() {
            return function(t) {
                // Arc sweeps along the visible speedometer from -135° to 135°
                const arcStartAngle = -Math.PI * 0.75;
                const arcEndAngle = -Math.PI * 0.75 + (Math.PI * 1.5) * t;
                const arcArc = arcGenerator({
                    innerRadius: radius - 10,
                    outerRadius: radius,
                    startAngle: arcStartAngle,
                    endAngle: arcEndAngle
                });
                return arcArc;
            };
        });

    // Tick marks (9 marks along the arc)
    for (let i = 0; i <= 8; i++) {
        const angle = -Math.PI * 0.75 + (Math.PI * 1.5 / 8) * i;
        const x1 = (radius - 5) * Math.sin(angle);
        const y1 = -(radius - 5) * Math.cos(angle);
        const x2 = (radius + 3) * Math.sin(angle);
        const y2 = -(radius + 3) * Math.cos(angle);

        speedometerGroup.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', '#1f2937')
            .attr('stroke-width', 1.5)
            .attr('opacity', 0)
            .transition()
            .delay(400)
            .duration(400)
            .attr('opacity', 0.7);
    }

    // Center circle
    speedometerGroup.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 5)
        .attr('fill', '#1f2937')
        .attr('opacity', 0)
        .transition()
        .delay(600)
        .duration(400)
        .attr('opacity', 1);
}

// ===== BASEMAP OPTIONS PREVIEW =====
function createBasemapOptionsViz() {
    const svg = d3.select('#fast-viz');
    fadeOutPreview(svg);

    // Left panel with options
    const panelX = 30;
    const panelY = 82;
    const optionGap = 40;
    const options = ['Default', 'Satellite', 'Plain', 'Custom'];
    const subtitles = ['Streets & terrain', 'Aerial imagery', 'Minimal style', 'Cities, highways & borders'];

    svg.append('text')
        .attr('x', panelX)
        .attr('y', panelY - 28)
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('fill', '#0f172a')
        .text('Basemap options');

    svg.append('text')
        .attr('x', panelX)
        .attr('y', panelY - 14)
        .attr('font-size', '9.5px')
        .attr('fill', '#94a3b8')
        .text('Choose a map style');

    const optionGroup = svg.append('g');

    const checkboxes = optionGroup.selectAll('g.option')
        .data(options)
        .enter()
        .append('g')
        .attr('class', 'option')
        .attr('transform', (d, i) => `translate(${panelX},${panelY + i * optionGap})`);

    checkboxes.append('rect')
        .attr('width', 14)
        .attr('height', 14)
        .attr('rx', 2)
        .attr('fill', '#fff')
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 1);

    const checkMarks = checkboxes.append('path')
        .attr('d', 'M3 7 L6 10 L11 3')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('opacity', d => d === 'Plain' ? 1 : 0);

    checkboxes.append('text')
        .attr('x', 22)
        .attr('y', 11)
        .attr('font-size', '12px')
        .attr('fill', '#334155')
        .text(d => d);

    checkboxes.append('text')
        .attr('x', 22)
        .attr('y', 25)
        .attr('font-size', '9.5px')
        .attr('fill', '#94a3b8')
        .text((d, i) => subtitles[i]);

    // Map frame on right — same proportions as bulk ops viz
    const mapX = 215;
    const mapY = 30;
    const mapW = 270;
    const mapH = 235;

    const mapGroup = svg.append('g')
        .attr('transform', `translate(${mapX},${mapY})`);

    mapGroup.append('rect')
        .attr('width', mapW)
        .attr('height', mapH)
        .attr('rx', 8)
        .attr('fill', '#f8fafc')
        .attr('stroke', '#e2e8f0');

    // Clipping path for images
    const defs = svg.append('defs');
    defs.append('clipPath')
        .attr('id', 'mapClip-fast')
        .attr('clipPathUnits', 'userSpaceOnUse')
        .append('rect')
        .attr('x', mapX + 6)
        .attr('y', mapY + 6)
        .attr('width', mapW - 12)
        .attr('height', mapH - 12)
        .attr('rx', 6);

    // Map images
    const defaultImage = svg.append('image')
        .attr('href', 'assets/florida-default.png')
        .attr('x', mapX + 6)
        .attr('y', mapY + 6)
        .attr('width', mapW - 12)
        .attr('height', mapH - 12)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('clip-path', 'url(#mapClip-fast)')
        .attr('opacity', 0);

    const satelliteImage = svg.append('image')
        .attr('href', 'assets/florida-satellite.png')
        .attr('x', mapX + 6)
        .attr('y', mapY + 6)
        .attr('width', mapW - 12)
        .attr('height', mapH - 12)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('clip-path', 'url(#mapClip-fast)')
        .attr('opacity', 0);

    const plainImage = svg.append('image')
        .attr('href', 'assets/florida-plain.png')
        .attr('x', mapX + 6).attr('y', mapY + 6)
        .attr('width', mapW - 12).attr('height', mapH - 12)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('clip-path', 'url(#mapClip-fast)')
        .attr('opacity', 1);

    // Cursor starts on Plain (index 2)
    const optionY = (i) => panelY + optionGap * i;
    const cursorGroup = svg.append('g')
        .attr('transform', `translate(${panelX + 7},${optionY(2) + 7})`);

    cursorGroup.append('path')
        .attr('d', 'M 0,0 L 0,12 L 3,10 L 6,16 L 8,15 L 5,9 L 11,9 Z')
        .attr('fill', '#000').attr('stroke', '#fff')
        .attr('stroke-width', 0.8).attr('stroke-linejoin', 'round');

    const clickRipple = svg.append('circle')
        .attr('r', 4).attr('fill', 'none')
        .attr('stroke', '#2563eb').attr('stroke-width', 1.5).attr('opacity', 0);

    const setSelected = (label) => {
        checkMarks.attr('opacity', d => d === label ? 1 : 0);
    };

    const setBasemap = (mode) => {
        defaultImage.attr('opacity', mode === 'default' ? 1 : 0);
        satelliteImage.attr('opacity', mode === 'satellite' ? 1 : 0);
        plainImage.attr('opacity', mode === 'plain' ? 1 : 0);
    };

    const animateClick = (idx, label, mode, delay) => {
        setTimeout(() => {
            cursorGroup.transition().duration(600)
                .attr('transform', `translate(${panelX + 7},${optionY(idx) + 7})`)
                .on('end', () => {
                    clickRipple
                        .attr('cx', panelX + 7).attr('cy', optionY(idx) + 7)
                        .attr('r', 4).attr('opacity', 0.7)
                        .transition().duration(300).attr('r', 10).attr('opacity', 0);
                    setSelected(label);
                    setBasemap(mode);
                });
        }, delay);
    };

    setSelected('Plain');
    setBasemap('plain');

    animateClick(1, 'Satellite', 'satellite', 800);
    animateClick(0, 'Default',   'default',   2000);
}

// ===== SCROLL OBSERVERS =====
const vizDurations = {
    'connect-viz': 1400,
    'build-viz': 1400,
    'refine-viz': 1400,
    'collab-viz': 1800,
    'report-viz': 2000,
    'bulk-viz': 3000,
    'fast-viz': 4500
};

let vizQueueEnd = 0;
let bulkStartTime = null;
let speedometerQueued = false;

const scheduleViz = (id, fn, duration) => {
    const now = performance.now();
    const startTime = Math.max(now, vizQueueEnd);
    vizQueueEnd = startTime + duration;
    const delay = Math.max(0, startTime - now);
    setTimeout(fn, delay);
    return startTime;
};

const scheduleVizImmediately = (id, fn) => {
    setTimeout(fn, 0);
};

const scheduleSpeedometer = () => {
    if (useBasemapPreview || speedometerQueued || bulkStartTime === null) return;
    speedometerQueued = true;
    const targetStart = bulkStartTime + (vizDurations['bulk-viz'] / 2);
    const delay = Math.max(0, targetStart - performance.now());
    setTimeout(() => {
        createSpeedometerViz();
    }, delay);
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');

            const id = entry.target.id;
            if (id === 'connect-viz') {
                scheduleViz(id, createConnectAnimation, vizDurations[id]);
            } else if (id === 'build-viz') {
                scheduleViz(id, createBuildAnimation, vizDurations[id]);
            } else if (id === 'refine-viz') {
                scheduleViz(id, createRefineAnimation, vizDurations[id]);
            } else if (id === 'collab-viz') {
                scheduleVizImmediately(id, createCollaborationViz);
            } else if (id === 'report-viz') {
                scheduleVizImmediately(id, createReportingViz);
            } else if (id === 'bulk-viz') {
                scheduleVizImmediately(id, createBulkOpsViz);
            } else if (id === 'fast-viz') {
                if (useBasemapPreview) {
                    scheduleVizImmediately(id, createBasemapOptionsViz);
                } else {
                    scheduleSpeedometer();
                }
            }
        }
    });
}, observerOptions);

// Observe all visualization SVGs
document.querySelectorAll('svg.step-viz, .collab-viz, .report-viz, .bulk-viz, .fast-viz').forEach(el => {
    observer.observe(el);
});
