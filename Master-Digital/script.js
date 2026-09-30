/* =========================================================
   MASTER DIGITAL SOLUTIONS & IT
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. AVAILABLE PAGES
   ========================================================= */

const pages = [
    'home',
    'about',
    'services',
    'projects',
    'training',
    'blog',
    'faq',
    'software',
    'network',
    'security',
    'contact'
];


/* =========================================================
   2. PAGE ROUTING
   ========================================================= */

function route() {
    // Get the page name from the URL hash
    let page = location.hash.replace('#', '');

    // If the page doesn't exist, show Home
    if (!pages.includes(page)) {
        page = 'home';
    }

    // Set the current page
    document.body.setAttribute('data-view', page);


    /* -----------------------------------------------------
       Update active navigation link
       ----------------------------------------------------- */

    document.querySelectorAll('nav ul a').forEach(function (link) {
        if (link.getAttribute('href') === '#' + page) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });


    /* -----------------------------------------------------
       Update browser page title
       ----------------------------------------------------- */

    let pageTitle;

    if (page === 'home') {
        pageTitle = '';
    } else if (page === 'faq') {
        pageTitle = 'FAQ';
    } else {
        pageTitle = page.charAt(0).toUpperCase() + page.slice(1);
    }

    document.title =
        (pageTitle ? pageTitle + ' | ' : '') +
        'Master Digital Solution and IT';


    /* -----------------------------------------------------
       Scroll back to the top
       ----------------------------------------------------- */

    window.scrollTo(0, 0);
}


/* Run routing when the URL hash changes */
window.addEventListener('hashchange', route);


/* Run routing when the website first loads */
route();


/* =========================================================
   3. FOOTER YEAR
   ========================================================= */

document.getElementById('y').textContent =
    new Date().getFullYear();


/* =========================================================
   4. MOBILE NAVIGATION
   ========================================================= */

const nav = document.getElementById('nav');
const menuButton = document.querySelector('.menu');


/* ---------------------------------------------------------
   Open / close mobile menu
   --------------------------------------------------------- */

menuButton.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');

    menuButton.setAttribute(
        'aria-expanded',
        isOpen
    );
});


/* ---------------------------------------------------------
   Close mobile menu after clicking a link
   --------------------------------------------------------- */

nav.addEventListener('click', function (event) {

    if (event.target.tagName === 'A') {

        nav.classList.remove('open');

        menuButton.setAttribute(
            'aria-expanded',
            false
        );
    }
});


/* =========================================================
   5. CONTACT FORM
   ========================================================= */

document.getElementById('f').addEventListener(
    'submit',
    function (event) {

        // Stop normal form submission
        event.preventDefault();


        /* -------------------------------------------------
           Collect form information
           ------------------------------------------------- */

        const form = event.target;
        const data = new FormData(form);


        /* -------------------------------------------------
           Determine how the message should be sent
           ------------------------------------------------- */

        const via =
            event.submitter?.getAttribute('data-via') || 'wa';


        /* -------------------------------------------------
           Create the message
           ------------------------------------------------- */

        const message =
            'Hello, my name is ' +
            data.get('n') +
            '.\n' +

            'Email: ' +
            data.get('e') +
            '\n' +

            'Service: ' +
            data.get('s') +
            '\n\n' +

            data.get('m');


        /* -------------------------------------------------
           Create WhatsApp or Email URL
           ------------------------------------------------- */

        let url;

        if (via === 'mail') {

            url =
                'mailto:ibraheemasud@gmail.com' +
                '?subject=' +
                encodeURIComponent(
                    'Enquiry: ' + data.get('s')
                ) +
                '&body=' +
                encodeURIComponent(message);

        } else {

            url =
                'https://wa.me/2348062385174' +
                '?text=' +
                encodeURIComponent(message);
        }


        /* -------------------------------------------------
           Open the message
           ------------------------------------------------- */

        const link = document.createElement('a');

        link.href = url;


        // Open WhatsApp in a new tab
        if (via !== 'mail') {
            link.target = '_blank';
            link.rel = 'noopener';
        }


        document.body.appendChild(link);

        link.click();

        link.remove();


        /* -------------------------------------------------
           Show confirmation message
           ------------------------------------------------- */

        const statusMessage =
            document.getElementById('msg');

        if (via === 'mail') {

            statusMessage.textContent =
                'Your email app should open with the message ready to send.';

        } else {

            statusMessage.textContent =
                'WhatsApp should open with your message ready to send.';
        }
    }
);