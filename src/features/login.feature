Feature: Login

    Scenario: Login with username from feature
        Given I am on the login page
        When I login as "featureUser@example.com"
        Then I should see the dashboard

    Scenario: Login with generated user
        Given I have a random user in the database
        When I login with that user
        Then I should see the dashboard
