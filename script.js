// Feature flags
const useBasemapPreview = true;

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
    const preview = svg.selectAll('.viz-preview-item');
    if (!preview.empty()) {
        preview.interrupt().transition().duration(300).attr('opacity', 0).remove();
    }
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
            .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
            .attr('opacity', 0.35)
            .style('pointer-events', 'none')
            .attr('clip-path', 'url(#connect-map-clip-preview)');
    }

    if (id === 'build-viz') {
        preview.append('text')
            .attr('x', width / 2)
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('font-weight', '600')
            .attr('fill', '#0f172a')
            .attr('opacity', 0.6)
            .text('Territory Carving');

        const previewDots = [{"id":0,"x":528.9665913744072,"y":232.5389664194208},{"id":1,"x":125.55076545431587,"y":41.57660706321811},{"id":2,"x":422.71274360361224,"y":70.21910558093494},{"id":3,"x":418.03020146179983,"y":78.7213820815414},{"id":4,"x":245.55433298746715,"y":251.1680786813243},{"id":5,"x":137.30061341319112,"y":371.41633731506954},{"id":6,"x":530.2511295128932,"y":97.81630805024932},{"id":7,"x":128.69400090046565,"y":81.05697477107444},{"id":8,"x":542.2135792840877,"y":281.27343760564565},{"id":9,"x":451.3975450074249,"y":320.73618100800707},{"id":10,"x":434.01745153502293,"y":61.85877227226192},{"id":11,"x":477.8767090837854,"y":296.9974153298156},{"id":12,"x":349.3344381479259,"y":283.3947482927972},{"id":13,"x":510.24443866443534,"y":238.59681665106876},{"id":14,"x":370.24507854203233,"y":374.05384849324815},{"id":15,"x":371.48747570819586,"y":152.77258029941964},{"id":16,"x":320.4783245229633,"y":315.0063555235003},{"id":17,"x":440.6297735313993,"y":172.1657670790982},{"id":18,"x":278.8825091196775,"y":246.4077829572972},{"id":19,"x":467.7161960411099,"y":229.0468987607013},{"id":20,"x":106.82260346011083,"y":258.4082653361728},{"id":21,"x":295.24013109167055,"y":206.1089026752032},{"id":22,"x":377.5364838487309,"y":362.1130698885574},{"id":23,"x":440.65946312366435,"y":298.1560425503241},{"id":24,"x":523.735501990612,"y":93.81244884729395},{"id":25,"x":495.0934263231682,"y":349.5763693094065},{"id":26,"x":65.42621002515762,"y":297.2184897548817},{"id":27,"x":368.4943094376692,"y":283.8987849084703},{"id":28,"x":294.7884512420792,"y":104.01538166858862},{"id":29,"x":472.6258589370277,"y":352.77156585599374},{"id":30,"x":155.33052072409916,"y":105.43277728331213},{"id":31,"x":528.6715514777636,"y":176.79290489797506},{"id":32,"x":42.129827014676366,"y":60.53515192869024},{"id":33,"x":451.6207753493237,"y":267.7038830627689},{"id":34,"x":567.2964208128191,"y":94.88474795702392},{"id":35,"x":153.3235192899034,"y":186.4465998785416},{"id":36,"x":463.26234755915146,"y":80.67489198281189},{"id":37,"x":125.41419278701872,"y":294.28055944860466},{"id":38,"x":439.86153466534296,"y":133.0392028377217},{"id":39,"x":194.93368833691426,"y":180.83014606951176},{"id":40,"x":79.99633419998804,"y":137.74828884743877},{"id":41,"x":58.49330460879963,"y":187.47883899134212},{"id":42,"x":112.56304383085909,"y":352.46702374091547},{"id":43,"x":508.2381218891492,"y":68.88021813329466},{"id":44,"x":384.0389916345548,"y":306.2433929667666},{"id":45,"x":41.636977995879214,"y":73.59777985899555},{"id":46,"x":279.6983118989998,"y":50.37582508790649},{"id":47,"x":334.81196191730237,"y":304.2387839919816},{"id":48,"x":281.08658080632733,"y":118.25973250715357},{"id":49,"x":445.0832603838238,"y":131.40687121643873},{"id":50,"x":326.38862685236404,"y":289.50379312751284},{"id":51,"x":496.2752465668699,"y":230.2598171589952},{"id":52,"x":366.0432993407712,"y":340.5370880837243},{"id":53,"x":317.7595634960056,"y":346.92259235640114},{"id":54,"x":117.22288021000377,"y":197.2183858012483},{"id":55,"x":182.1706619644557,"y":254.29199656926122},{"id":56,"x":47.13714675864324,"y":176.99746376227208},{"id":57,"x":201.33588480770962,"y":149.06815558918632},{"id":58,"x":91.54809617095493,"y":325.67876276308374},{"id":59,"x":133.43078644603725,"y":167.5097714615487},{"id":60,"x":376.2807074562379,"y":338.91919388816797},{"id":61,"x":407.1529065542624,"y":148.9258468491815},{"id":62,"x":568.7268616101842,"y":40.69837927449485},{"id":63,"x":289.44227667096834,"y":115.63731245422652},{"id":64,"x":223.8379709577677,"y":93.09686083411125},{"id":65,"x":78.29979970571185,"y":227.28167822343286},{"id":66,"x":421.88261450002256,"y":148.18750539593123},{"id":67,"x":550.3744292656776,"y":148.00804724400047},{"id":68,"x":119.08236129211978,"y":331.6980436503316},{"id":69,"x":49.530348683746126,"y":155.6641242830176},{"id":70,"x":240.08173171728922,"y":171.2225213753289},{"id":71,"x":309.4945344206528,"y":351.50530734633554},{"id":72,"x":267.9910429336882,"y":156.2736919664142},{"id":73,"x":467.0969272187418,"y":320.4948137045035},{"id":74,"x":152.18167331606358,"y":292.4511234700276},{"id":75,"x":547.3646800017813,"y":197.00156613469605},{"id":76,"x":187.67341599534106,"y":170.52882978491655},{"id":77,"x":372.3538849151225,"y":145.05579732543316},{"id":78,"x":103.89922681599373,"y":202.42283792547468},{"id":79,"x":312.23910041704784,"y":49.10232608810491},{"id":80,"x":217.67078848927798,"y":90.85724302190131},{"id":81,"x":497.28539622450455,"y":248.9887816071153},{"id":82,"x":533.2627893460715,"y":155.46715111549656},{"id":83,"x":252.2679879759914,"y":306.51825769491427},{"id":84,"x":265.99102348088496,"y":110.77934191250205},{"id":85,"x":397.1911624527378,"y":360.858735965424},{"id":86,"x":105.56071661308242,"y":172.984434741808},{"id":87,"x":388.19439759509066,"y":204.8346747232015},{"id":88,"x":545.3198899513318,"y":316.10921878488466},{"id":89,"x":382.12022769046035,"y":42.647585045619664},{"id":90,"x":69.17762507664884,"y":218.0445618667126},{"id":91,"x":456.7489761027682,"y":102.21993492050423},{"id":92,"x":250.69522520921572,"y":235.56248890244544},{"id":93,"x":310.2693557001839,"y":366.97839345999637},{"id":94,"x":364.99581459921893,"y":158.9117643659522},{"id":95,"x":195.47480062072609,"y":366.6871760792416},{"id":96,"x":505.0976938284814,"y":270.3225660723649},{"id":97,"x":55.20105354425676,"y":172.97758126654585},{"id":98,"x":473.81116691938456,"y":257.4229837821494},{"id":99,"x":448.0947636758686,"y":128.14697588326226},{"id":100,"x":459.6244946589289,"y":218.2311901048006},{"id":101,"x":174.6095098604208,"y":275.69738836170734},{"id":102,"x":368.8487945683813,"y":125.09106034791137},{"id":103,"x":270.6524497733239,"y":150.54975286687522},{"id":104,"x":501.26572140481767,"y":148.81455929633114},{"id":105,"x":399.46589472085947,"y":371.86181006247955},{"id":106,"x":192.8067618389979,"y":370.4040184233487},{"id":107,"x":48.42378985111968,"y":260.3427851251823},{"id":108,"x":374.766620519584,"y":256.3453868899703},{"id":109,"x":242.37619774607134,"y":41.8699357725409},{"id":110,"x":425.13914077778827,"y":227.36937244663156},{"id":111,"x":95.02933472690798,"y":153.19445486943852},{"id":112,"x":328.14673653188686,"y":75.6915913996587},{"id":113,"x":394.33737626129636,"y":40.339181778389204},{"id":114,"x":212.6595279882624,"y":123.6397909745869},{"id":115,"x":508.7552576282832,"y":140.99337599281546},{"id":116,"x":349.7639971426956,"y":236.42253709849896},{"id":117,"x":63.54201590634162,"y":373.91106492838566},{"id":118,"x":542.9456328538064,"y":376.3600186497081},{"id":119,"x":450.5468713214633,"y":271.66117029716406},{"id":120,"x":225.8470118482498,"y":256.57061820765125},{"id":121,"x":240.35828077654935,"y":148.64639229272893},{"id":122,"x":567.2300977221653,"y":111.263239426668},{"id":123,"x":49.45299301935822,"y":189.86530052172466},{"id":124,"x":135.8092858998363,"y":86.17176364731714},{"id":125,"x":234.7079023233999,"y":373.4051642447425},{"id":126,"x":469.6746400300158,"y":48.21928022938797},{"id":127,"x":372.3048388667895,"y":186.38681847841514},{"id":128,"x":275.3454304654024,"y":310.6552088568653},{"id":129,"x":223.50600034643048,"y":293.6636191487132},{"id":130,"x":54.338429573998766,"y":115.03537605704908},{"id":131,"x":188.8615721009657,"y":182.87720838573443},{"id":132,"x":507.72060039470097,"y":352.5348895662104},{"id":133,"x":348.2077011958553,"y":100.0290190125526},{"id":134,"x":551.9931218660438,"y":132.15401115680672},{"id":135,"x":72.456431840231,"y":106.76107562770345},{"id":136,"x":129.08013514614655,"y":297.21250428359207},{"id":137,"x":396.6128831461261,"y":136.4767368845918},{"id":138,"x":540.5784614914263,"y":139.51285550992566},{"id":139,"x":527.9797962462578,"y":192.6702670913927},{"id":140,"x":219.22127527157366,"y":146.27920606592397},{"id":141,"x":481.1323348880229,"y":110.92310884094856},{"id":142,"x":549.6098648557384,"y":63.03785225084695},{"id":143,"x":68.92333329350518,"y":69.7833109690583},{"id":144,"x":161.11314386535594,"y":276.4921169381936},{"id":145,"x":192.97232348271552,"y":78.23257595779177},{"id":146,"x":277.6590927465769,"y":258.02418625044777},{"id":147,"x":464.31911681652446,"y":73.98002368941766},{"id":148,"x":84.98654076234027,"y":153.08690516622312},{"id":149,"x":259.49683349678,"y":111.90442853676447},{"id":150,"x":506.4036499916632,"y":238.7893188859723},{"id":151,"x":215.73967554163974,"y":101.53007614415719},{"id":152,"x":433.42574807524863,"y":329.2445818463863},{"id":153,"x":48.823856258627615,"y":281.64354557454703},{"id":154,"x":387.70205384494005,"y":108.66078556603532},{"id":155,"x":511.82985655677317,"y":130.1356912345039},{"id":156,"x":433.3858224057931,"y":214.15691483710302},{"id":157,"x":94.88617311594582,"y":217.5837378697966},{"id":158,"x":369.7543255898047,"y":58.431780123309636},{"id":159,"x":282.9405705325107,"y":170.15333048535157},{"id":160,"x":412.22331649867095,"y":123.54218337533653},{"id":161,"x":489.74478899886674,"y":98.50963263718265},{"id":162,"x":477.84465135410227,"y":66.89005192555533},{"id":163,"x":37.386498971336074,"y":114.07984078010867},{"id":164,"x":249.50124673011453,"y":128.36683938102215},{"id":165,"x":436.9378914612358,"y":86.1848452885384},{"id":166,"x":232.8426581449684,"y":325.27690303440386},{"id":167,"x":502.67016433827337,"y":75.69144149289004},{"id":168,"x":406.1945938441552,"y":157.3894518449148},{"id":169,"x":153.50488122741336,"y":170.34263253833822},{"id":170,"x":335.6432644908617,"y":67.72011451199243},{"id":171,"x":63.93691010540824,"y":314.17088531179064},{"id":172,"x":316.39250986708316,"y":333.60920696955606},{"id":173,"x":77.64438470930074,"y":138.64514131179936},{"id":174,"x":116.83539464837335,"y":134.79991124512728},{"id":175,"x":172.538163538571,"y":66.1656354447488},{"id":176,"x":178.15143574747552,"y":239.66080880594714},{"id":177,"x":545.6036821561285,"y":318.31056159229246},{"id":178,"x":435.7803379413796,"y":109.42951890749558},{"id":179,"x":140.8716274989501,"y":168.0317536005553},{"id":180,"x":293.68274619215845,"y":143.6173306797897},{"id":181,"x":151.976716010953,"y":156.41292149525822},{"id":182,"x":130.8148419223224,"y":213.33870701639046},{"id":183,"x":363.8934166307426,"y":345.33503555089464},{"id":184,"x":550.8636676989855,"y":321.98703011981877},{"id":185,"x":102.8171314736956,"y":44.914962086046344},{"id":186,"x":283.4767600390376,"y":317.0831059322933},{"id":187,"x":526.3914221279744,"y":242.78737697559257},{"id":188,"x":184.25085234633602,"y":226.12798445783386},{"id":189,"x":327.64503565048534,"y":375.41802927198427},{"id":190,"x":211.9350158254901,"y":295.06758224686644},{"id":191,"x":266.51379900486353,"y":204.01712799062395},{"id":192,"x":293.9567939283872,"y":91.67400345215974},{"id":193,"x":258.0212781287961,"y":339.35801338798916},{"id":194,"x":42.96155131170654,"y":234.16088946063587},{"id":195,"x":131.03159144608026,"y":179.61409776777276},{"id":196,"x":275.8427226707549,"y":78.54443971447313},{"id":197,"x":148.88136285877255,"y":81.08359997175353},{"id":198,"x":36.67133812065711,"y":319.8603103181508},{"id":199,"x":71.14868951249485,"y":372.26526512661457}];

        preview.selectAll('.preview-dot')
            .data(previewDots)
            .enter()
            .append('circle')
            .attr('class', 'preview-dot')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 2.5)
            .attr('fill', '#3b82f6')
            .attr('opacity', 0.5);

        const lineGenerator = d3.line()
            .curve(d3.curveCatmullRom)
            .x(d => d[0])
            .y(d => d[1]);

        preview.append('path')
            .attr('d', lineGenerator([[192,35],[218,60.4375],[238,73.4375],[257,89.4375],[276,104.4375],[275,126.4375],[279,134.4375],[289,147.4375],[300,164.4375],[316,211.4375],[392,231.4375],[427,249.4375],[463,244.4375],[482,236.4375],[488,212.4375],[546,213.4375],[559,214.4375],[593,216.4375],[599,217.4375]]))
            .attr('stroke', '#000000')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .attr('fill', 'none')
            .attr('opacity', 0.3);

        preview.append('path')
            .attr('d', lineGenerator([[326,219.4375],[298,256.4375],[293,285.4375],[307,305.4375],[298,337.4375],[281,362.4375],[288,400.4375]]))
            .attr('stroke', '#000000')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .attr('fill', 'none')
            .attr('opacity', 0.3);
    }

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
            .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
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
            .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
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
            .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
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
    ['connect-viz', 'build-viz', 'refine-viz', 'collab-viz', 'report-viz', 'bulk-viz', 'fast-viz'].forEach(renderVizPreview);
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
    const tableY = 40;
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

        // Row data
        headerX = tableX + 8;
        const values = [row.zip, row.territory, row.region, row.area, row.account, '...'];
        values.forEach((val, colIdx) => {
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
        .attr('stroke', '#ccc')
        .attr('stroke-width', 1)
        .attr('rx', 4)
        .attr('opacity', 0)
        .transition()
        .delay(1200)
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
        .attr('rx', 4);

    // Map image (US map) - zoomed to Northeast
    const mapImage = svg.append('image')
        .attr('x', mapX - 370)
        .attr('y', mapY - 146)
        .attr('width', mapWidth * 3.45)
        .attr('height', mapHeight * 3.45)
        .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
        .attr('opacity', 0.75)
        .style('pointer-events', 'none')
        .attr('clip-path', 'url(#connect-map-clip)');

    // Connection lines from table to map
    const mapPins = [
        { x: 438.83, y: 140.40, color: '#3b82f6' },  // Boston
        { x: 454.06, y: 117.05, color: '#f97316' },  // Manhattan
        { x: 421.01, y: 153.06, color: '#a855f7' },  // Philly
        { x: 413.04, y: 171.04, color: '#10b981' },  // DC
        { x: 403.79, y: 210.20, color: '#ec4899' },  // Raleigh
        { x: 386.87, y: 157.25, color: '#0ea5e9' }   // Pittsburgh
    ];

    const getStartPoint = (idx) => ({
        x: tableX + totalTableWidth + 5,
        y: tableY + headerHeight + idx * rowHeight + 9
    });

    const buildPath = (d, idx) => {
        const start = getStartPoint(idx);
        const endX = d.x;
        const endY = d.y;
        const midX = (start.x + endX) / 2;
        const midY = (start.y + endY) / 2 - 18;
        return `M ${start.x},${start.y} Q ${midX},${midY} ${endX},${endY}`;
    };

    // Connection lines (curved + dotted)
    const lineSelection = svg.selectAll('path.connect-line')
        .data(mapPins)
        .enter()
        .append('path')
        .attr('class', 'connect-line')
        .attr('d', (d, i) => buildPath(d, i))
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0)
        .transition()
        .delay((d, i) => 1400 + i * 120)
        .duration(500)
        .attr('opacity', 0.6);

    // Pin dots
    svg.selectAll('circle.connect-pin')
        .data(mapPins)
        .enter()
        .append('circle')
        .attr('class', 'connect-pin')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 3)
        .attr('fill', d => d.color)
        .attr('opacity', 0)
        .transition()
        .delay((d, i) => 1900 + i * 120)
        .duration(400)
        .attr('opacity', 1);
}

// ===== BUILD ANIMATION =====
// Territory Carving: Blue dots scattered, curved dotted lines carve out territories
function createBuildAnimation() {
    const svg = d3.select('#build-viz');
    fadeOutPreview(svg);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('font-weight', '600')
        .attr('fill', '#0f172a')
        .text('Territory Carving');

    // Hardcoded dot positions from editor
    const dots = [{"id":0,"x":528.9665913744072,"y":232.5389664194208},{"id":1,"x":125.55076545431587,"y":41.57660706321811},{"id":2,"x":422.71274360361224,"y":70.21910558093494},{"id":3,"x":418.03020146179983,"y":78.7213820815414},{"id":4,"x":245.55433298746715,"y":251.1680786813243},{"id":5,"x":137.30061341319112,"y":371.41633731506954},{"id":6,"x":530.2511295128932,"y":97.81630805024932},{"id":7,"x":128.69400090046565,"y":81.05697477107444},{"id":8,"x":542.2135792840877,"y":281.27343760564565},{"id":9,"x":451.3975450074249,"y":320.73618100800707},{"id":10,"x":434.01745153502293,"y":61.85877227226192},{"id":11,"x":477.8767090837854,"y":296.9974153298156},{"id":12,"x":349.3344381479259,"y":283.3947482927972},{"id":13,"x":510.24443866443534,"y":238.59681665106876},{"id":14,"x":370.24507854203233,"y":374.05384849324815},{"id":15,"x":371.48747570819586,"y":152.77258029941964},{"id":16,"x":320.4783245229633,"y":315.0063555235003},{"id":17,"x":440.6297735313993,"y":172.1657670790982},{"id":18,"x":278.8825091196775,"y":246.4077829572972},{"id":19,"x":467.7161960411099,"y":229.0468987607013},{"id":20,"x":106.82260346011083,"y":258.4082653361728},{"id":21,"x":295.24013109167055,"y":206.1089026752032},{"id":22,"x":377.5364838487309,"y":362.1130698885574},{"id":23,"x":440.65946312366435,"y":298.1560425503241},{"id":24,"x":523.735501990612,"y":93.81244884729395},{"id":25,"x":495.0934263231682,"y":349.5763693094065},{"id":26,"x":65.42621002515762,"y":297.2184897548817},{"id":27,"x":368.4943094376692,"y":283.8987849084703},{"id":28,"x":294.7884512420792,"y":104.01538166858862},{"id":29,"x":472.6258589370277,"y":352.77156585599374},{"id":30,"x":155.33052072409916,"y":105.43277728331213},{"id":31,"x":528.6715514777636,"y":176.79290489797506},{"id":32,"x":42.129827014676366,"y":60.53515192869024},{"id":33,"x":451.6207753493237,"y":267.7038830627689},{"id":34,"x":567.2964208128191,"y":94.88474795702392},{"id":35,"x":153.3235192899034,"y":186.4465998785416},{"id":36,"x":463.26234755915146,"y":80.67489198281189},{"id":37,"x":125.41419278701872,"y":294.28055944860466},{"id":38,"x":439.86153466534296,"y":133.0392028377217},{"id":39,"x":194.93368833691426,"y":180.83014606951176},{"id":40,"x":79.99633419998804,"y":137.74828884743877},{"id":41,"x":58.49330460879963,"y":187.47883899134212},{"id":42,"x":112.56304383085909,"y":352.46702374091547},{"id":43,"x":508.2381218891492,"y":68.88021813329466},{"id":44,"x":384.0389916345548,"y":306.2433929667666},{"id":45,"x":41.636977995879214,"y":73.59777985899555},{"id":46,"x":279.6983118989998,"y":50.37582508790649},{"id":47,"x":334.81196191730237,"y":304.2387839919816},{"id":48,"x":281.08658080632733,"y":118.25973250715357},{"id":49,"x":445.0832603838238,"y":131.40687121643873},{"id":50,"x":326.38862685236404,"y":289.50379312751284},{"id":51,"x":496.2752465668699,"y":230.2598171589952},{"id":52,"x":366.0432993407712,"y":340.5370880837243},{"id":53,"x":317.7595634960056,"y":346.92259235640114},{"id":54,"x":117.22288021000377,"y":197.2183858012483},{"id":55,"x":182.1706619644557,"y":254.29199656926122},{"id":56,"x":47.13714675864324,"y":176.99746376227208},{"id":57,"x":201.33588480770962,"y":149.06815558918632},{"id":58,"x":91.54809617095493,"y":325.67876276308374},{"id":59,"x":133.43078644603725,"y":167.5097714615487},{"id":60,"x":376.2807074562379,"y":338.91919388816797},{"id":61,"x":407.1529065542624,"y":148.9258468491815},{"id":62,"x":568.7268616101842,"y":40.69837927449485},{"id":63,"x":289.44227667096834,"y":115.63731245422652},{"id":64,"x":223.8379709577677,"y":93.09686083411125},{"id":65,"x":78.29979970571185,"y":227.28167822343286},{"id":66,"x":421.88261450002256,"y":148.18750539593123},{"id":67,"x":550.3744292656776,"y":148.00804724400047},{"id":68,"x":119.08236129211978,"y":331.6980436503316},{"id":69,"x":49.530348683746126,"y":155.6641242830176},{"id":70,"x":240.08173171728922,"y":171.2225213753289},{"id":71,"x":309.4945344206528,"y":351.50530734633554},{"id":72,"x":267.9910429336882,"y":156.2736919664142},{"id":73,"x":467.0969272187418,"y":320.4948137045035},{"id":74,"x":152.18167331606358,"y":292.4511234700276},{"id":75,"x":547.3646800017813,"y":197.00156613469605},{"id":76,"x":187.67341599534106,"y":170.52882978491655},{"id":77,"x":372.3538849151225,"y":145.05579732543316},{"id":78,"x":103.89922681599373,"y":202.42283792547468},{"id":79,"x":312.23910041704784,"y":49.10232608810491},{"id":80,"x":217.67078848927798,"y":90.85724302190131},{"id":81,"x":497.28539622450455,"y":248.9887816071153},{"id":82,"x":533.2627893460715,"y":155.46715111549656},{"id":83,"x":252.2679879759914,"y":306.51825769491427},{"id":84,"x":265.99102348088496,"y":110.77934191250205},{"id":85,"x":397.1911624527378,"y":360.858735965424},{"id":86,"x":105.56071661308242,"y":172.984434741808},{"id":87,"x":388.19439759509066,"y":204.8346747232015},{"id":88,"x":545.3198899513318,"y":316.10921878488466},{"id":89,"x":382.12022769046035,"y":42.647585045619664},{"id":90,"x":69.17762507664884,"y":218.0445618667126},{"id":91,"x":456.7489761027682,"y":102.21993492050423},{"id":92,"x":250.69522520921572,"y":235.56248890244544},{"id":93,"x":310.2693557001839,"y":366.97839345999637},{"id":94,"x":364.99581459921893,"y":158.9117643659522},{"id":95,"x":195.47480062072609,"y":366.6871760792416},{"id":96,"x":505.0976938284814,"y":270.3225660723649},{"id":97,"x":55.20105354425676,"y":172.97758126654585},{"id":98,"x":473.81116691938456,"y":257.4229837821494},{"id":99,"x":448.0947636758686,"y":128.14697588326226},{"id":100,"x":459.6244946589289,"y":218.2311901048006},{"id":101,"x":174.6095098604208,"y":275.69738836170734},{"id":102,"x":368.8487945683813,"y":125.09106034791137},{"id":103,"x":270.6524497733239,"y":150.54975286687522},{"id":104,"x":501.26572140481767,"y":148.81455929633114},{"id":105,"x":399.46589472085947,"y":371.86181006247955},{"id":106,"x":192.8067618389979,"y":370.4040184233487},{"id":107,"x":48.42378985111968,"y":260.3427851251823},{"id":108,"x":374.766620519584,"y":256.3453868899703},{"id":109,"x":242.37619774607134,"y":41.8699357725409},{"id":110,"x":425.13914077778827,"y":227.36937244663156},{"id":111,"x":95.02933472690798,"y":153.19445486943852},{"id":112,"x":328.14673653188686,"y":75.6915913996587},{"id":113,"x":394.33737626129636,"y":40.339181778389204},{"id":114,"x":212.6595279882624,"y":123.6397909745869},{"id":115,"x":508.7552576282832,"y":140.99337599281546},{"id":116,"x":349.7639971426956,"y":236.42253709849896},{"id":117,"x":63.54201590634162,"y":373.91106492838566},{"id":118,"x":542.9456328538064,"y":376.3600186497081},{"id":119,"x":450.5468713214633,"y":271.66117029716406},{"id":120,"x":225.8470118482498,"y":256.57061820765125},{"id":121,"x":240.35828077654935,"y":148.64639229272893},{"id":122,"x":567.2300977221653,"y":111.263239426668},{"id":123,"x":49.45299301935822,"y":189.86530052172466},{"id":124,"x":135.8092858998363,"y":86.17176364731714},{"id":125,"x":234.7079023233999,"y":373.4051642447425},{"id":126,"x":469.6746400300158,"y":48.21928022938797},{"id":127,"x":372.3048388667895,"y":186.38681847841514},{"id":128,"x":275.3454304654024,"y":310.6552088568653},{"id":129,"x":223.50600034643048,"y":293.6636191487132},{"id":130,"x":54.338429573998766,"y":115.03537605704908},{"id":131,"x":188.8615721009657,"y":182.87720838573443},{"id":132,"x":507.72060039470097,"y":352.5348895662104},{"id":133,"x":348.2077011958553,"y":100.0290190125526},{"id":134,"x":551.9931218660438,"y":132.15401115680672},{"id":135,"x":72.456431840231,"y":106.76107562770345},{"id":136,"x":129.08013514614655,"y":297.21250428359207},{"id":137,"x":396.6128831461261,"y":136.4767368845918},{"id":138,"x":540.5784614914263,"y":139.51285550992566},{"id":139,"x":527.9797962462578,"y":192.6702670913927},{"id":140,"x":219.22127527157366,"y":146.27920606592397},{"id":141,"x":481.1323348880229,"y":110.92310884094856},{"id":142,"x":549.6098648557384,"y":63.03785225084695},{"id":143,"x":68.92333329350518,"y":69.7833109690583},{"id":144,"x":161.11314386535594,"y":276.4921169381936},{"id":145,"x":192.97232348271552,"y":78.23257595779177},{"id":146,"x":277.6590927465769,"y":258.02418625044777},{"id":147,"x":464.31911681652446,"y":73.98002368941766},{"id":148,"x":84.98654076234027,"y":153.08690516622312},{"id":149,"x":259.49683349678,"y":111.90442853676447},{"id":150,"x":506.4036499916632,"y":238.7893188859723},{"id":151,"x":215.73967554163974,"y":101.53007614415719},{"id":152,"x":433.42574807524863,"y":329.2445818463863},{"id":153,"x":48.823856258627615,"y":281.64354557454703},{"id":154,"x":387.70205384494005,"y":108.66078556603532},{"id":155,"x":511.82985655677317,"y":130.1356912345039},{"id":156,"x":433.3858224057931,"y":214.15691483710302},{"id":157,"x":94.88617311594582,"y":217.5837378697966},{"id":158,"x":369.7543255898047,"y":58.431780123309636},{"id":159,"x":282.9405705325107,"y":170.15333048535157},{"id":160,"x":412.22331649867095,"y":123.54218337533653},{"id":161,"x":489.74478899886674,"y":98.50963263718265},{"id":162,"x":477.84465135410227,"y":66.89005192555533},{"id":163,"x":37.386498971336074,"y":114.07984078010867},{"id":164,"x":249.50124673011453,"y":128.36683938102215},{"id":165,"x":436.9378914612358,"y":86.1848452885384},{"id":166,"x":232.8426581449684,"y":325.27690303440386},{"id":167,"x":502.67016433827337,"y":75.69144149289004},{"id":168,"x":406.1945938441552,"y":157.3894518449148},{"id":169,"x":153.50488122741336,"y":170.34263253833822},{"id":170,"x":335.6432644908617,"y":67.72011451199243},{"id":171,"x":63.93691010540824,"y":314.17088531179064},{"id":172,"x":316.39250986708316,"y":333.60920696955606},{"id":173,"x":77.64438470930074,"y":138.64514131179936},{"id":174,"x":116.83539464837335,"y":134.79991124512728},{"id":175,"x":172.538163538571,"y":66.1656354447488},{"id":176,"x":178.15143574747552,"y":239.66080880594714},{"id":177,"x":545.6036821561285,"y":318.31056159229246},{"id":178,"x":435.7803379413796,"y":109.42951890749558},{"id":179,"x":140.8716274989501,"y":168.0317536005553},{"id":180,"x":293.68274619215845,"y":143.6173306797897},{"id":181,"x":151.976716010953,"y":156.41292149525822},{"id":182,"x":130.8148419223224,"y":213.33870701639046},{"id":183,"x":363.8934166307426,"y":345.33503555089464},{"id":184,"x":550.8636676989855,"y":321.98703011981877},{"id":185,"x":102.8171314736956,"y":44.914962086046344},{"id":186,"x":283.4767600390376,"y":317.0831059322933},{"id":187,"x":526.3914221279744,"y":242.78737697559257},{"id":188,"x":184.25085234633602,"y":226.12798445783386},{"id":189,"x":327.64503565048534,"y":375.41802927198427},{"id":190,"x":211.9350158254901,"y":295.06758224686644},{"id":191,"x":266.51379900486353,"y":204.01712799062395},{"id":192,"x":293.9567939283872,"y":91.67400345215974},{"id":193,"x":258.0212781287961,"y":339.35801338798916},{"id":194,"x":42.96155131170654,"y":234.16088946063587},{"id":195,"x":131.03159144608026,"y":179.61409776777276},{"id":196,"x":275.8427226707549,"y":78.54443971447313},{"id":197,"x":148.88136285877255,"y":81.08359997175353},{"id":198,"x":36.67133812065711,"y":319.8603103181508},{"id":199,"x":71.14868951249485,"y":372.26526512661457}];

    // Territory assignments from editor
    const line1DotIds = new Set([109,46,196,192,28,63,48,180,127,94,15,77,102,133,112,170,79,158,89,113,126,162,147,36,10,2,3,154,137,160,66,61,168,87,110,19,100,156,17,38,49,99,178,165,91,141,161,167,43,24,6,155,142,62,34,122,134,138,67,82,104,115,31,139,75]);
    const line2DotIds = new Set([116,108,27,12,50,16,172,53,71,93,189,47,44,60,52,183,22,14,85,105,9,152,23,119,33,98,81,13,150,51,0,187,96,8,177,88,184,118,132,11,73,29,25]);

    // Draw dots (all start as blue)
    const dotSelection = svg.selectAll('.carve-dot')
        .data(dots)
        .enter()
        .append('circle')
        .attr('class', 'carve-dot')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 2.5)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0);

    // Create smooth curves from editor points (adjusted to avoid title)
    const line1Points = [[192,35],[218,60.4375],[238,73.4375],[257,89.4375],[276,104.4375],[275,126.4375],[279,134.4375],[289,147.4375],[300,164.4375],[316,211.4375],[392,231.4375],[427,249.4375],[463,244.4375],[482,236.4375],[488,212.4375],[546,213.4375],[559,214.4375],[593,216.4375],[599,217.4375]];
    const line2Points = [[326,219.4375],[298,256.4375],[293,285.4375],[307,305.4375],[298,337.4375],[281,362.4375],[288,400.4375]];

    const lineGenerator = d3.line()
        .curve(d3.curveCatmullRom)
        .x(d => d[0])
        .y(d => d[1]);

    const line1 = svg.append('path')
        .attr('d', lineGenerator(line1Points))
        .attr('stroke', '#000000')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('fill', 'none')
        .attr('opacity', 0);

    const line2 = svg.append('path')
        .attr('d', lineGenerator(line2Points))
        .attr('stroke', '#000000')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('fill', 'none')
        .attr('opacity', 0);

    // Animation sequence
    function animateCarving() {
        // 1. Fade in all dots
        dotSelection
            .transition()
            .delay((d, i) => i * 5)
            .duration(400)
            .attr('opacity', 0.9);

        // 2. After dots appear, draw first carving line
        setTimeout(() => {
            const line1Length = line1.node().getTotalLength();
            line1
                .attr('stroke-dasharray', `${line1Length} ${line1Length}`)
                .attr('stroke-dashoffset', line1Length)
                .attr('opacity', 1)
                .transition()
                .duration(2500)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0);

            // 3. Change line 1 territory dots to orange after line is drawn
            setTimeout(() => {
                dotSelection
                    .filter(d => line1DotIds.has(d.id))
                    .transition()
                    .duration(500)
                    .attr('fill', '#f97316');

                // 4. Draw second carving line
                setTimeout(() => {
                    const line2Length = line2.node().getTotalLength();
                    line2
                        .attr('stroke-dasharray', `${line2Length} ${line2Length}`)
                        .attr('stroke-dashoffset', line2Length)
                        .attr('opacity', 1)
                        .transition()
                        .duration(2500)
                        .ease(d3.easeLinear)
                        .attr('stroke-dashoffset', 0);

                    // 5. Change line 2 territory dots to purple after second line is drawn
                    setTimeout(() => {
                        dotSelection
                            .filter(d => line2DotIds.has(d.id))
                            .transition()
                            .duration(500)
                            .attr('fill', '#a855f7');
                    }, 2550);
                }, 700);
            }, 2550);
        }, 1200);
    }

    // Start animation
    animateCarving();
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
        { name: 'Territory 1', value: 1380 },
        { name: 'Territory 2', value: 1310 },
        { name: 'Territory 3', value: 1215 },
        { name: 'Territory 4', value: 1170 },
        { name: 'Territory 5', value: 1145 },
        { name: 'Territory 6', value: 1125 },
        { name: 'Territory 7', value: 1110 },
        { name: 'Territory 8', value: 1095 },
        { name: 'Territory 9', value: 1085 },
        { name: 'Territory 10', value: 1075 },
        { name: 'Territory 11', value: 1065 },
        { name: 'Territory 12', value: 1055 },
        { name: 'Territory 13', value: 1048 },
        { name: 'Territory 14', value: 1042 },
        { name: 'Territory 15', value: 1038 },
        { name: 'Territory 16', value: 1035 },
        { name: 'Territory 17', value: 1032 },
        { name: 'Territory 18', value: 1030 },
        { name: 'Territory 19', value: 1028 },
        { name: 'Territory 20', value: 1025 },
        { name: 'Territory 21', value: 1018 },
        { name: 'Territory 22', value: 1005 },
        { name: 'Territory 23', value: 980 },
        { name: 'Territory 24', value: 955 },
        { name: 'Territory 25', value: 910 },
        { name: 'Territory 26', value: 875 },
        { name: 'Territory 27', value: 840 },
        { name: 'Territory 28', value: 800 },
        { name: 'Territory 29', value: 730 },
        { name: 'Territory 30', value: 650 }
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

                    // Show tooltip
                    g.append('text')
                        .attr('class', 'tooltip')
                        .attr('x', +d3.select(this).attr('cx'))
                        .attr('y', +d3.select(this).attr('cy') - 12)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '10px')
                        .attr('font-weight', '600')
                        .attr('fill', '#0f172a')
                        .attr('background', 'white')
                        .text(`${d.name} (${d.value})`);
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

    // Users on the left
    const users = [
        { y: 90, color: '#3b82f6', label: 'A' },
        { y: 140, color: '#f97316', label: 'B' },
        { y: 190, color: '#a855f7', label: 'C' }
    ];

    const userX = 50;
    const centerX = 160;
    const centerY = 140;
    const mapX = 220;
    const mapWidth = 280;
    const mapHeight = 200;

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

    // Center connection point
    svg.append('circle')
        .attr('cx', centerX)
        .attr('cy', centerY)
        .attr('r', 6)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .transition()
        .delay(1100)
        .duration(400)
        .attr('opacity', 1);

    // Line to map (points to middle of map)
    const mapMidX = mapX + (mapWidth / 2);
    const mapMidY = (centerY - 100) + (mapHeight / 2);
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
            const mapGroup = svg.append('g')
                .attr('transform', `translate(${mapX},${centerY - 100})`);

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
    const tableY = 75;
    const colWidths = [85, 40, 55, 30, 65];

    // Region data
    const regions = [
        { name: 'Pacific Northwest', soc: '5', accts: '245', ellipsis: '...', index: '1008' },
        { name: 'California', soc: '5', accts: '510', ellipsis: '...', index: '1006' },
        { name: 'Mountain West', soc: '4', accts: '156', ellipsis: '...', index: '1002' },
        { name: 'Southwest', soc: '6', accts: '456', ellipsis: '...', index: '1001' }
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

    // Total row
    const totalY = tableY + rowHeight + regions.length * rowHeight;
    
    // Calculate totals
    const totalAccts = regions.reduce((sum, r) => sum + parseInt(r.accts), 0);
    const avgIndex = Math.round(regions.reduce((sum, r) => sum + parseInt(r.index), 0) / regions.length);
    
    svg.append('rect')
        .attr('x', tableX)
        .attr('y', totalY - 2)
        .attr('width', 275)
        .attr('height', rowHeight)
        .attr('fill', '#3b82f6')
        .attr('opacity', 0)
        .transition()
        .delay(1100)
        .duration(300)
        .attr('opacity', 0.08);

    // Total row data
    const totalValues = ['West Area', '5', totalAccts.toString(), '...', avgIndex.toString()];
    hX = tableX + 6;
    totalValues.forEach((val, colIdx) => {
        svg.append('text')
            .attr('x', colIdx === 0 ? hX : hX + colWidths[colIdx] / 2 - 6)
            .attr('y', totalY + rowHeight * 0.6)
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

    // Input section on left
    const inputX = 15;
    const inputY = 35;
    const inputW = 180;

    // Zip code input box
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', inputY)
        .attr('width', inputW)
        .attr('height', 90)
        .attr('fill', 'white')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 4)
        .attr('opacity', 0)
        .transition()
        .duration(300)
        .attr('opacity', 1);

    svg.append('text')
        .attr('x', inputX + 6)
        .attr('y', inputY + 14)
        .attr('font-size', '10px')
        .attr('fill', '#64748b')
        .attr('opacity', 0)
        .text('Paste zips here...')
        .transition()
        .duration(300)
        .attr('opacity', 1);

    // Zip codes appearing
    const zips = ['89101', '89102', '89103', '89104', '89105'];
    zips.forEach((zip, idx) => {
        svg.append('text')
            .attr('x', inputX + 6)
            .attr('y', inputY + 30 + idx * 11)
            .attr('font-size', '9px')
            .attr('fill', '#0f172a')
            .attr('opacity', 0)
            .text(zip)
            .transition()
            .delay(idx * 120)
            .duration(300)
            .attr('opacity', 1);
    });

    // Territory label
    svg.append('text')
        .attr('x', inputX)
        .attr('y', inputY + 104)
        .attr('font-size', '10px')
        .attr('fill', '#64748b')
        .attr('opacity', 0)
        .text('Assign to:')
        .transition()
        .delay(700)
        .duration(300)
        .attr('opacity', 1);

    // Territory input
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', inputY + 108)
        .attr('width', inputW)
        .attr('height', 22)
        .attr('fill', '#f8fafc')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 1)
        .attr('rx', 3)
        .attr('opacity', 0)
        .transition()
        .delay(700)
        .duration(300)
        .attr('opacity', 1);

    svg.append('text')
        .attr('x', inputX + 6)
        .attr('y', inputY + 120)
        .attr('font-size', '9px')
        .attr('fill', '#0f172a')
        .attr('opacity', 0)
        .text('Territory B')
        .transition()
        .delay(700)
        .duration(300)
        .attr('opacity', 1);

    // Assign button
    svg.append('rect')
        .attr('x', inputX)
        .attr('y', inputY + 140)
        .attr('width', inputW)
        .attr('height', 26)
        .attr('fill', '#3b82f6')
        .attr('stroke', 'none')
        .attr('rx', 4)
        .attr('opacity', 0)
        .transition()
        .delay(900)
        .duration(300)
        .attr('opacity', 1);

    svg.append('text')
        .attr('x', inputX + inputW / 2)
        .attr('y', inputY + 156)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .attr('fill', 'white')
        .attr('opacity', 0)
        .text('Assign')
        .transition()
        .delay(900)
        .duration(300)
        .attr('opacity', 1);

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
        .attr('fill', 'white')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('rx', 6)
        .attr('opacity', 0)
        .transition()
        .delay(600)
        .duration(400)
        .attr('opacity', 1);

    // Map image (zoomed to CA/NV area)
    svg.append('image')
        .attr('x', mapX - 11)
        .attr('y', mapY - 246)
        .attr('width', (mapW - 10) * 3.5)
        .attr('height', (mapH - 10) * 3.5)
        .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Blank_US_Map_%28states_only%29.svg/1000px-Blank_US_Map_%28states_only%29.svg.png')
        .attr('opacity', 0.5)
        .style('pointer-events', 'none')
        .attr('clip-path', `url(#map-clip)`);

    // Nevada dots (positioned over Nevada on map)
    const nevadaDots = [
        { x: 94, y: 48 },
        { x: 107, y: 88 },
        { x: 121, y: 60 },
        { x: 90, y: 73 },
        { x: 87, y: 30 },
        { x: 82, y: 52 },
        { x: 76, y: 66 },
        { x: 66, y: 79 },
        { x: 81, y: 101 },
        { x: 94, y: 116 },
        { x: 123, y: 164 },
        { x: 114, y: 151 },
        { x: 101, y: 128 },
        { x: 134, y: 124 },
        { x: 135, y: 149 },
        { x: 140, y: 98 },
        { x: 108, y: 107 },
        { x: 122, y: 106 },
        { x: 123, y: 82 },
        { x: 148, y: 73 },
        { x: 154, y: 48 },
        { x: 118, y: 36 },
        { x: 103, y: 34 },
        { x: 110, y: 50 },
        { x: 78, y: 41 },
        { x: 95, y: 96 },
        { x: 136, y: 61 },
        { x: 107, y: 65 },
        { x: 124, y: 132 }
    ];

    // Utah dots (positioned over Utah on map)
    const utahDots = [
        { x: 179, y: 52 },
        { x: 203, y: 59 },
        { x: 174, y: 125 },
        { x: 163, y: 96 },
        { x: 157, y: 130 },
        { x: 176, y: 103 },
        { x: 226, y: 81 },
        { x: 191, y: 61 },
        { x: 195, y: 74 },
        { x: 164, y: 141 },
        { x: 190, y: 147 },
        { x: 223, y: 140 },
        { x: 184, y: 96 },
        { x: 177, y: 77 },
        { x: 175, y: 67 },
        { x: 229, y: 103 },
        { x: 213, y: 86 },
        { x: 210, y: 115 },
        { x: 221, y: 128 },
        { x: 167, y: 83 },
        { x: 186, y: 87 },
        { x: 208, y: 136 },
        { x: 196, y: 102 },
        { x: 164, y: 114 },
        { x: 205, y: 149 },
        { x: 221, y: 152 },
        { x: 175, y: 137 },
        { x: 177, y: 103 },
        { x: 197, y: 90 },
        { x: 178, y: 92 },
        { x: 168, y: 61 }
    ];

    // Draw Nevada dots (blue, stay blue)
    nevadaDots.forEach((dot, idx) => {
        svg.append('circle')
            .attr('cx', mapX + 5 + dot.x)
            .attr('cy', mapY + 5 + dot.y)
            .attr('r', 2.5)
            .attr('fill', '#3b82f6')
            .attr('opacity', 0)
            .transition()
            .delay(1200 + idx * 40)
            .duration(300)
            .attr('opacity', 0.8);
    });

    // Draw Utah dots (blue initially, then red after "assign")
    utahDots.forEach((dot, idx) => {
        svg.append('circle')
            .attr('cx', mapX + 5 + dot.x)
            .attr('cy', mapY + 5 + dot.y)
            .attr('r', 2.5)
            .attr('fill', '#3b82f6')
            .attr('opacity', 0)
            .transition()
            .delay(1200 + (nevadaDots.length + idx) * 40)
            .duration(300)
            .attr('opacity', 0.8)
            // Change to red after button "click"
            .transition()
            .delay(2200)
            .duration(600)
            .attr('fill', '#ef4444');
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
    const panelY = 50;
    const optionGap = 30;
    const options = ['Default', 'Satellite', 'Plain', 'Custom'];

    svg.append('text')
        .attr('x', panelX)
        .attr('y', panelY - 20)
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .attr('fill', '#0f172a')
        .text('Basemap options');

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
        .attr('y', 12)
        .attr('font-size', '12px')
        .attr('fill', '#334155')
        .text(d => d);

    // Map frame on right
    const mapX = 170;
    const mapY = 30;
    const mapW = 310;
    const mapH = 225;

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
        .attr('href', 'assets/florida-grey.png')
        .attr('x', mapX + 6)
        .attr('y', mapY + 6)
        .attr('width', mapW - 12)
        .attr('height', mapH - 12)
        .attr('preserveAspectRatio', 'xMidYMid slice')
        .attr('clip-path', 'url(#mapClip-fast)')
        .attr('opacity', 1);

    // Apple-style mouse cursor
    const plainY = panelY + optionGap * 2;
    const cursorGroup = svg.append('g')
        .attr('transform', `translate(${panelX + 7},${plainY + 7})`);

    const cursorPointer = cursorGroup.append('path')
        .attr('d', 'M 0,0 L 0,12 L 3,10 L 6,16 L 8,15 L 5,9 L 11,9 Z')
        .attr('fill', '#000')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.8)
        .attr('stroke-linejoin', 'round');

    const clickRipple = svg.append('circle')
        .attr('r', 4)
        .attr('fill', 'none')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0);

    const setSelected = (label) => {
        checkMarks.attr('opacity', d => d === label ? 1 : 0);
    };

    const setBasemap = (mode) => {
        if (mode === 'plain') {
            plainImage.attr('opacity', 1);
            satelliteImage.attr('opacity', 0);
            defaultImage.attr('opacity', 0);
        } else if (mode === 'satellite') {
            plainImage.attr('opacity', 0);
            satelliteImage.attr('opacity', 1);
            defaultImage.attr('opacity', 0);
        } else if (mode === 'default') {
            plainImage.attr('opacity', 0);
            satelliteImage.attr('opacity', 0);
            defaultImage.attr('opacity', 1);
        }
    };

    // Initialize with Plain selected and grey map showing
    setSelected('Plain');
    setBasemap('plain');

    // Animation sequence
    const satelliteY = panelY + optionGap;
    const defaultY = panelY;

    // Animate mouse from Plain to Satellite after 800ms
    setTimeout(() => {
        cursorGroup.transition()
            .duration(700)
            .attr('transform', `translate(${panelX + 7},${satelliteY + 7})`)
            .on('end', () => {
                clickRipple
                    .attr('cx', panelX + 7)
                    .attr('cy', satelliteY + 7)
                    .attr('r', 4)
                    .attr('opacity', 0.7)
                    .transition()
                    .duration(300)
                    .attr('r', 10)
                    .attr('opacity', 0);
                setSelected('Satellite');
                setBasemap('satellite');
            });
    }, 800);

    // Then to Default after 1400ms more (2200ms total)
    setTimeout(() => {
        cursorGroup.transition()
            .duration(700)
            .attr('transform', `translate(${panelX + 7},${defaultY + 7})`)
            .on('end', () => {
                clickRipple
                    .attr('cx', panelX + 7)
                    .attr('cy', defaultY + 7)
                    .attr('r', 4)
                    .attr('opacity', 0.7)
                    .transition()
                    .duration(300)
                    .attr('r', 10)
                    .attr('opacity', 0);
                setSelected('Default');
                setBasemap('default');
            });
    }, 2200);
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
