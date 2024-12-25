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

function addBott(ele, what, section) {
    const del = document.createElement('button');
    del.innerText = 'Delete';
    const fdata = new FormData();
    fdata.append('section', section);
    fdata.append('item', what);

    del.onclick = () => {
        fetch('http://127.0.0.1:5000/api/deleteItem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"section": section, "item": what})
        })
    }
    ele.appendChild(del);
}


function addInp(ele, section) {
    const div = document.createElement('div');
    div.classList.add('item');
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.placeholder = 'Add item';
    const add = document.createElement('button');
    add.innerText = 'Add';
    add.onclick = () => {
        fetch('http://127.0.0.1:5000/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"section": section, "item": inp.value})
        })};

    div.appendChild(inp);
    div.appendChild(add);

    ele.appendChild(div);
}


function clickedSec(name) {
    console.log(name);

    fetch('http://127.0.0.1:5000/api/getMenu')
    .then(response => response.json())
    .then(data => {
        const edit = document.getElementById('edit');
        edit.innerHTML = '';
        
        data.forEach(element => {
            if (element.name == name) {
                element['items'].forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('item');

                    const p = document.createElement('p');
                    p.innerHTML = item;
                    div.appendChild(p);
                    
                    addBott(div, item, name);

                    edit.appendChild(div);
                });
            }});


        addInp(edit, name);
        
        edit.onclick = (e) => {
            e.stopPropagation();
        }

        document.getElementById("edit-container").style.display = 'flex';
        document.getElementById("edit-container").onclick = () => {
            document.getElementById("edit-container").style.display = 'none';
        }
    });

}


function loadData() {
    fetch('http://127.0.0.1:5000/api/getMenu')
    .then(response => response.json())
    .then(data => {
        let menu = document.getElementById('menu');

        data.forEach(element => {
            const sec = document.createElement('section');
            sec.classList.add('menu-section');
            sec.onclick = () => clickedSec(element.name);


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
