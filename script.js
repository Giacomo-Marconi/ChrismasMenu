const icon = [
    {
        "icon": "fa-snowflake",
        "color": "#75d9eb"
    },
    {
        "icon": "fa-sleigh",
        "color": "red"
    },
    {
        "icon": "fa-tree",
        "color": "green"
    },
    {
        "icon": "fa-gift",
        "color": "red"
    },
    {
        "icon": "fa-star",
        "color": "#f2d82c"
    },
]


function addEnd() {
    const menu = document.getElementById('menu');
    /*<div class="decor-bottom">
            <i class="fas fa-star"></i>
            <i class="fas fa-ribbon"></i>
            <i class="fas fa-star"></i>
        </div>*/

    const decorBottom = document.createElement('div');
    decorBottom.classList.add('decor-bottom');
    const star1 = document.createElement('i');
    star1.classList.add('fas', 'fa-star');
    const ribbon = document.createElement('i');
    ribbon.classList.add('fas', 'fa-ribbon');
    const star2 = document.createElement('i');
    star2.classList.add('fas', 'fa-star');

    decorBottom.appendChild(star1);
    decorBottom.appendChild(ribbon);
    decorBottom.appendChild(star2);

    menu.appendChild(decorBottom);
}



function loadData() {
    fetch('http://127.0.0.1:5000/api/getMenu')
    .then(response => response.json())
    .then(data => {
        let menu = document.getElementById('menu');

        data.forEach(element => {
            const sec = document.createElement('section');
            sec.classList.add('menu-section');
            const h4 = document.createElement('h4');
            h4.innerText = element.name;
            sec.appendChild(h4)
            element['items'].forEach(item => {
                const p = document.createElement('p');
                p.innerHTML = item;
                sec.appendChild(p);
            });
            menu.appendChild(sec);
        });

        addEnd();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
   const santaContainer = document.querySelector('.falling-santas');
   const createSanta = () => {
       const santa = document.createElement('i');
       const inx = Math.floor(Math.random() * icon.length);
       santa.classList.add('fas', icon[inx]['icon'], 'santa');
      
       santa.style.left = Math.random() * 100 + 'vw';
       santa.style.animationDuration = Math.random() * 4 + 3 + 's'
       santa.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
       santa.style.color = icon[inx]['color'];
       santaContainer.appendChild(santa);

       santa.addEventListener('animationend', () => {
           santa.remove();
       });
   };

   setInterval(createSanta, 100);
});

