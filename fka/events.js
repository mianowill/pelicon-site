var upcoming = document.getElementById('upcoming');
var past = document.getElementById('past');
var hidden = document.getElementById('hidden');
var foot = document.getElementById('foot');
var ticket_links = document.getElementById('tickets');

fetch('./events.json')
    .then(response => response.json())
    .then(data => {
        var cnt = 0;
        const num_past_events = 3;
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };

        data.events.forEach(function(event) {
            var date = new Date(event.date);
            var now = new Date();
            var html = '<tr><td>' + date.toLocaleDateString('en-GB', options) + '</td><td>[' + event.title + '] ' + event.name + '</td></tr>';

            if (event.link) {
                var link = '<a class="link" href="' + event.link + '" target="_blank">[Tickets] ' + event.name + '</a>';
            } else {
                var link = '';
            }

            if (date > now) {
                upcoming.innerHTML = html + upcoming.innerHTML;
                ticket_links.innerHTML = link + ticket_links.innerHTML;
            } else {
                if (cnt < num_past_events) {
                    past.innerHTML += html;
                } else {
                    hidden.innerHTML += html;
                }
                cnt++;
            }
        });

        foot.innerHTML = 'and ' + (cnt - num_past_events) + ' more...';

        // on click, show the hidden events
        foot.addEventListener('click', function() {
            if (hidden.style.display === 'none') {
                hidden.style.display = 'table';

                past.lastElementChild.style.borderBottom = getComputedStyle(document.documentElement).getPropertyValue('--table-border');
                foot.innerHTML = 'hide';
            } else {
                hidden.style.display = 'none';
                foot.innerHTML = 'and ' + (cnt - num_past_events) + ' more...';

                var last_child = past.lastElementChild;
                last_child.style.borderBottom = 'none';
            }

            past.style.display = 'table';
        });
    })