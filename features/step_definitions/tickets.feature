Feature: Ticket booking
    Scenario: Should book one ticket
        When user clicks on the next date, and the first available time, on 6 row and 6 chair and click on Забронировать button
        Then the user sees a page with the results of booking tickets with Row / Chair '6/6'
    Scenario: Should book two ticket
        When user clicks on the next date, and the first available time, on 6 row and 6 chair and on 6 row and 7 chair and click on Забронировать button
        Then the user sees a page with the results of booking tickets with Row / Chair: '6/6, 6/7'