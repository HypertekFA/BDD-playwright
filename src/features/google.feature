Feature: google validation

    @smoke
    Scenario: enter something in google textbox
        Given user is on google page
        When user enter "macbook pro" into search box
        When user enter the enter botton