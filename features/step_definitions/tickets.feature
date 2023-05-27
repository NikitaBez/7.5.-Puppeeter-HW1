Feature: Ticket booking
Scenario: Should book one ticket
Given user is on "https://qamid.tmweb.ru" page
When the user clicks on the next date, and the first available time, selects the first available place, click on "Забронировать" button
Then the user sees a page with the results of booking tickets


    Feature Description 