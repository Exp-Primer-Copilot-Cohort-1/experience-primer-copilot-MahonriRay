function skillsMember() {
    var member = {
        name: "John",
        age: 30,
        skills: ["JavaScript", "HTML", "CSS"],
        salary: 4000,
        address: {
            city: "Paris",
            country: "France"
        },
        getSalary: function () {
            return this.salary;
        },
        getName: function () {
            return this.name;
        },
        getSkills: function () {
            return this.skills;
        },
        getCity: function () {
            return this.address.city;
        },
        getCountry: function () {
            return this.address.country;
        }
    };
    return member;
}