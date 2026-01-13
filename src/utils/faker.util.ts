import { faker } from '@faker-js/faker';

export class FakerUtil {
  /**
   * Generate a random first name
   */
  static getFirstName(): string {
    return faker.person.firstName();
  }

  /**
   * Generate a random last name
   */
  static getLastName(): string {
    return faker.person.lastName();
  }

  /**
   * Generate a random full name
   */
  static getFullName(): string {
    return faker.person.fullName();
  }

  /**
   * Generate a random middle initial (single letter A-Z)
   */
  static getMiddleInitial(): string {
    return faker.string.alpha(1).toUpperCase();
  }

  /**
   * Generate a random email address
   */
  static getEmailAddress(): string {
    return faker.internet.email();
  }

  /**
   * Generate a random email with specific domain
   */
  static getEmailAddressWithDomain(domain: string): string {
    return faker.internet.email({ provider: domain });
  }

  /**
   * Generate a random phone number
   * Format: (XXX) XXX-XXXX
   */
  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  /**
   * Generate a random phone number with custom format
   */
  static getPhoneNumberWithFormat(): string {
    return faker.phone.number();
  }

  /**
   * Generate a random SSN (Social Security Number)
   * Format: XXX-XX-XXXX
   */
  static getSSN(): string {
    return faker.string.numeric(3) + '-' + faker.string.numeric(2) + '-' + faker.string.numeric(4);
  }

  /**
   * Generate a random username
   */
  static getUsername(): string {
    return faker.internet.username();
  }

  /**
   * Generate a random password
   */
  static getPassword(length: number = 12): string {
    return faker.internet.password({ length, memorable: false });
  }

  /**
   * Generate a memorable (easier to remember) password
   */
  static getMemorablePassword(length: number = 12): string {
    return faker.internet.password({ length, memorable: true });
  }

  /**
   * Generate random street address
   */
  static getStreetAddress(): string {
    return faker.location.streetAddress();
  }

  /**
   * Generate random city
   */
  static getCity(): string {
    return faker.location.city();
  }

  /**
   * Generate random state/province
   */
  static getState(): string {
    return faker.location.state();
  }

  /**
   * Generate random zip/postal code
   */
  static getZipCode(): string {
    return faker.location.zipCode('######');
  }

  /**
   * Generate random country
   */
  static getCountry(): string {
    return faker.location.country();
  }

  /**
   * Generate complete address (street, city, state, zip, country)
   */
  static getFullAddress(): string {
    return faker.location.streetAddress() + ', ' + 
           faker.location.city() + ', ' + 
           faker.location.state() + ' ' + 
           faker.location.zipCode('######') + ', ' +
           faker.location.country();
  }

  /**
   * Generate random date of birth (adult)
   * Returns date for someone 18-65 years old
   */
  static getDateOfBirth(minAge: number = 18, maxAge: number = 65): string {
    const birthDate = faker.date.birthdate({ mode: 'age', min: minAge, max: maxAge });
    const day = String(birthDate.getDate()).padStart(2, '0');
    const month = String(birthDate.getMonth() + 1).padStart(2, '0');
    const year = birthDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Generate random company name
   */
  static getCompanyName(): string {
    return faker.company.name();
  }

  /**
   * Generate random job title
   */
  static getJobTitle(): string {
    return faker.person.jobTitle();
  }

  /**
   * Generate random credit card number
   */
  static getCreditCardNumber(): string {
    return faker.finance.creditCardNumber();
  }

  /**
   * Generate random credit card number with specific provider
   * Providers: 'visa', 'mastercard', 'american_express', 'diners_club', 'discover', 'jcb'
   */
  static getCreditCardNumberForProvider(provider: string): string {
    return faker.finance.creditCardNumber({ issuer: provider });
  }

  /**
   * Generate random credit card CVV (3-4 digits)
   */
  static getCreditCardCVV(): string {
    return faker.string.numeric(3);
  }

  /**
   * Generate random credit card expiry date
   */
  static getCreditCardExpiry(): string {
    const month = String(faker.number.int({ min: 1, max: 12 })).padStart(2, '0');
    const year = String(faker.number.int({ min: 25, max: 35 }));
    return `${month}/${year}`;
  }

  /**
   * Generate random gender (male/female)
   */
  static getGender(): string {
    return faker.person.sexType();
  }

  /**
   * Generate random text (paragraph)
   */
  static getParagraph(): string {
    return faker.lorem.paragraph();
  }

  /**
   * Generate random sentence
   */
  static getSentence(): string {
    return faker.lorem.sentence();
  }

  /**
   * Generate random word
   */
  static getWord(): string {
    return faker.lorem.word();
  }

  /**
   * Generate random words (comma-separated)
   */
  static getWords(count: number = 5): string {
    return faker.lorem.words(count);
  }

  /**
   * Generate random number within range
   */
  static getNumber(min: number = 0, max: number = 100): number {
    return faker.number.int({ min, max });
  }

  /**
   * Generate random boolean (true/false)
   */
  static getBoolean(): boolean {
    return faker.datatype.boolean();
  }

  /**
   * Generate random UUID
   */
  static getUUID(): string {
    return faker.string.uuid();
  }

  /**
   * Generate random slug (for URLs)
   */
  static getSlug(): string {
    return faker.lorem.slug();
  }

  /**
   * Generate random color hex code
   */
  static getColorHex(): string {
    return faker.color.rgb({ format: 'hex' });
  }

  /**
   * Generate random image URL
   */
  static getImageUrl(width: number = 640, height: number = 480): string {
    return faker.image.url();
  }

  /**
   * Generate random avatar URL
   */
  static getAvatarUrl(): string {
    return faker.image.avatar();
  }

  /**
   * Generate random website URL
   */
  static getWebsiteUrl(): string {
    return faker.internet.url();
  }

  /**
   * Generate random IP address (IPv4)
   */
  static getIPAddress(): string {
    return faker.internet.ipv4();
  }

  /**
   * Generate random IPv6 address
   */
  static getIPv6Address(): string {
    return faker.internet.ipv6();
  }

  /**
   * Generate random MAC address
   */
  static getMACAddress(): string {
    return faker.internet.mac();
  }

  /**
   * Generate random user agent
   */
  static getUserAgent(): string {
    return faker.internet.userAgent();
  }

  /**
   * Generate random headline
   */
  static getHeadline(): string {
    return faker.lorem.sentence({ min: 3, max: 5 });
  }

  /**
   * Generate random description/bio
   */
  static getDescription(): string {
    return faker.lorem.sentences({ min: 2, max: 3 });
  }

  /**
   * Generate realistic user data object
   */
  static getRandomUser() {
    return {
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      email: this.getEmailAddress(),
      phone: this.getPhoneNumber(),
      username: this.getUsername(),
      password: this.getPassword(),
      ssn: this.getSSN(),
      dateOfBirth: this.getDateOfBirth(),
      gender: this.getGender(),
      address: this.getFullAddress(),
      company: this.getCompanyName(),
      jobTitle: this.getJobTitle(),
    };
  }

  /**
   * Generate realistic address data object
   */
  static getRandomAddress() {
    return {
      street: this.getStreetAddress(),
      city: this.getCity(),
      state: this.getState(),
      zipCode: this.getZipCode(),
      country: this.getCountry(),
      fullAddress: this.getFullAddress(),
    };
  }

  /**
   * Generate realistic credit card data object
   */
  static getRandomCreditCard() {
    return {
      cardNumber: this.getCreditCardNumber(),
      cvv: this.getCreditCardCVV(),
      expiryDate: this.getCreditCardExpiry(),
      cardholderName: this.getFullName(),
    };
  }

  /**
   * Generate realistic company data object
   */
  static getRandomCompany() {
    return {
      name: this.getCompanyName(),
      email: this.getEmailAddress(),
      phone: this.getPhoneNumber(),
      website: this.getWebsiteUrl(),
      address: this.getFullAddress(),
    };
  }

  /**
   * Generate custom data object with multiple fields
   */
  static getCustomData(fields: string[]): Record<string, any> {
    const data: Record<string, any> = {};
    
    fields.forEach(field => {
      switch (field.toLowerCase()) {
        case 'firstname':
          data.firstName = this.getFirstName();
          break;
        case 'lastname':
          data.lastName = this.getLastName();
          break;
        case 'fullname':
          data.fullName = this.getFullName();
          break;
        case 'email':
          data.email = this.getEmailAddress();
          break;
        case 'phone':
          data.phone = this.getPhoneNumber();
          break;
        case 'ssn':
          data.ssn = this.getSSN();
          break;
        case 'address':
          data.address = this.getFullAddress();
          break;
        case 'username':
          data.username = this.getUsername();
          break;
        case 'password':
          data.password = this.getPassword();
          break;
        case 'company':
          data.company = this.getCompanyName();
          break;
        case 'jobtitle':
          data.jobTitle = this.getJobTitle();
          break;
        default:
          break;
      }
    });
    
    return data;
  }
}
