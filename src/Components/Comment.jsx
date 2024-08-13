import React from 'react';
import Star from "../assets/star1.svg";
import Star1 from "../assets/empty.svg"; 
import Star2 from "../assets/halffilled.svg"
export let userdata = [
    {
      "username": "john_doe",
      "rating": 4.5,
      "comment": "Great course! Very informative and well-structured.",
      "date": "2024-07-25"
    },
    {
      "username": "jane_smith",
      "rating": 3.0,
      "comment": "The content is good, but the pacing is a bit slow.",
      "date": "2024-07-26"
    },
    {
      "username": "alice_wonderland",
      "rating": 5.0,
      "comment": "Absolutely loved it! The instructor is very knowledgeable.",
      "date": "2024-07-27"
    },
    {
      "username": "bob_builder",
      "rating": 2.5,
      "comment": "Found it hard to follow. Needs more practical examples.",
      "date": "2024-07-28"
    },
    {
      "username": "charlie_brown",
      "rating": 4.0,
      "comment": "Good course, but some sections could be more detailed.",
      "date": "2024-07-29"
    },
    {
      "username": "diana_prince",
      "rating": 4.8,
      "comment": "Excellent course! Highly recommend.",
      "date": "2024-07-30"
    },
    {
      "username": "edward_snowden",
      "rating": 3.5,
      "comment": "Informative, but the assignments were a bit challenging.",
      "date": "2024-07-31"
    },
    {
      "username": "fiona_shrek",
      "rating": 4.2,
      "comment": "Very good course. Learned a lot of new things.",
      "date": "2024-08-01"
    },
    {
      "username": "george_washington",
      "rating": 3.8,
      "comment": "Well-organized course, but could use more visuals.",
      "date": "2024-08-02"
    },
    {
      "username": "harry_potter",
      "rating": 4.7,
      "comment": "Amazing course! The practical sessions were very helpful.",
      "date": "2024-08-03"
    }
  ];
  

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  
  return (
    <div className="flex items-center gap-1">
      {Array(fullStars).fill(<img src={Star} alt="Filled Star" className="w-4 h-4" />)}
      {halfStars === 1 && <img src={Star2} alt="Half Star" className="w-4 h-4" />} {/* Use a separate half-star SVG if available */}
      {Array(emptyStars).fill(<img src={Star1} alt="Empty Star" className="w-4 h-4" />)}
    </div>
  );
}

function Comment() {
  return (
    <div>
      <section className="bg-background px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Course Reviews</h2>
            <p className="text-muted-foreground">See what our students have to say about this course.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userdata.map((user, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border">
                    <img className="aspect-square h-full w-full" alt="User Avatar" src="/placeholder-user.jpg" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{user.username.replace("_", " ")}</h3>
                    <div className="flex items-center gap-1 text-primary">
                      {renderStars(user.rating)}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  {user.comment}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(user.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Comment;
