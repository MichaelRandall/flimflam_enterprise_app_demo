-- Table for muscle group ('Front', 'Back', 'Arms', 'Legs', 'Core')
CREATE SCHEMA IF NOT EXISTS workout_tracker;
SET search_path TO workout_tracker, public;

CREATE TABLE workout_tracker.muscle_group(
    muscle_group_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    muscle_group_description VARCHAR(500) NOT NULL
);

CREATE TABLE workout_tracker.exercises (
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    exercise_description VARCHAR(255),
    is_push BOOLEAN NOT NULL,
    is_pull BOOLEAN NOT NULL,
    is_bodyweight BOOLEAN NOT NULL,
    is_compound BOOLEAN NOT NULL,
    requires_weights BOOLEAN NOT NULL,
    is_home_friendly BOOLEAN NOT NULL
);

-- Junction table for muscle_group and exercises (Many-to-Many)
CREATE TABLE workout_tracker.exercise_muscle_groups(
    exercise_id INTEGER REFERENCES workout_tracker.exercises(exercise_id),
    muscle_group_Id INTEGER REFERENCES workout_tracker.muscle_group(muscle_group_id),
    PRIMARY KEY (exercise_id, muscle_group_id)
);

CREATE TABLE workout_tracker.workout_location_lut(
    workout_location_id SERIAL PRIMARY KEY,
    workout_location VARCHAR(100) NOT NULL,
    is_obsolete BOOLEAN NOT NULL
);

CREATE TABLE workout_tracker.workouts(
    workout_id SERIAL PRIMARY KEY,
    log_date DATE NOT NULL,
    workout_location_id INTEGER NOT NULL REFERENCES workout_tracker.workout_location_lut(workout_location_id),
    focus_id INTEGER NOT NULL REFERENCES workout_tracker.muscle_group(muscle_group_id)
);

CREATE TABLE workout_tracker.workout_sets (
    set_id SERIAL PRIMARY KEY,
    workout_id INTEGER NOT NULL REFERENCES workout_tracker.workouts(workout_id),
    exercise_id INTEGER NOT NULL REFERENCES workout_tracker.exercises(exercise_id),
    set_number SMALLINT NOT NULL,
    weight_used NUMERIC(5,2),
    reps SMALLINT NOT NULL
);

-- Seed workout location lut
INSERT INTO workout_tracker.workout_location_lut (workout_location, is_obsolete) VALUES
('Home',FALSE),
('Gym - VillaSport',FALSE),
('Gym - 24hr Fitness',FALSE);



-- Seed initial muscle groups
INSERT INTO workout_tracker.muscle_group (name,muscle_group_description) VALUES
('Front','Focus on the chest'),
('Back','Focus on the back'),
('Arms','Focus on the arms'),
('Legs','Focus on the legs'),
('Core','Focus on stomach and lower back stabalization');




-- Seed initial exercises
INSERT INTO workout_tracker.exercises(name, exercise_description, is_push, is_pull, is_bodyweight, is_compound, requires_weights, is_home_friendly) VALUES
('Body Weight Squats',NULL,TRUE,FALSE,TRUE,TRUE,FALSE,TRUE),
('Standing Opposite Elbow to Knee Crunch',NULL,FALSE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Standing Same Elbow to Knee Crunch',NULL,FALSE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Standing Wall Cross Climber',NULL,FALSE,TRUE,TRUE,FALSE,FALSE,TRUE),
('Forearm Plank',NULL,TRUE, FALSE, TRUE,TRUE,FALSE,TRUE),
('Russian Twist','Can add weight if desired',FALSE,TRUE,TRUE,FALSE,FALSE,TRUE),
('Dead Bug',NULL,FALSE,TRUE,TRUE,FALSE,FALSE,TRUE),
('Half Kneeling Wood Chop','Can add weight if desired',FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Side Bend','Similar to Standing Wall Cross Climber',TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Standing Leg Crunch','Kick your legs up and clap',TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Hound Dog',NULL,TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Bicycle Kicks - Crunches',NULL,FALSE,TRUE,TRUE,FALSE,FALSE,TRUE),
('Superman',NULL,FALSE,TRUE,TRUE,TRUE,FALSE,TRUE),
('Standing Dumbbell Curls',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Standing Dumbbell Flys',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Goblet Squat',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Bent-Over Row',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Floor Press',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Standing Calf Raises',NULL,TRUE,FALSE,TRUE,TRUE,FALSE,TRUE),
('Dumbbell Romanian Deadlift',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Standing Overhead Press',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Lunges',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Tricep Extensions',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Thrusters','Squat with an overhead press',TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Renegade Rows',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Bicep',NULL,FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Plank with Dmbbell Tap',NULL,FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Dumbbell Step-ups',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Dumbbell Incline Press',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,FALSE),
('Hammer Curls',NULL,FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Single-Leg Romanian Deadlift',NULL,FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Side Plank with Reach','Reach top arm under and behind you',TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Dumbbell Farmers Walk','Walk with weight in each hand',FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Dumbbell Reverse Lunges',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Plank Up-Downs','High plank to forearm plank and back up',TRUE,FALSE,TRUE,TRUE,FALSE,TRUE),
('Dumbbell Floor Flys',NULL,FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Dumbbell Overhead Tricep Extension',NULL,TRUE,FALSE,FALSE,FALSE,TRUE,TRUE),
('Box Squats with Dumbbells','Superset - Squat to chair or box',TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Glute Bridge with Dumbbells','Superset - Place dumbbells on hips',TRUE,FALSE,FALSE,FALSE,TRUE,TRUE),
('Push-Ups on Dumbbells','Superset',TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Incline Dumbbell Flys','Superset - On pillow or bench',TRUE,FALSE,FALSE,FALSE,TRUE,TRUE),
('Wide Dumbbell Rows','Sueprset - Row with a wider grip',FALSE,TRUE,FALSE,TRUE,TRUE,TRUE),
('Concentration Curls','Superset - Rest elbow on knee',FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Dumbbell Suitcase Carry','Superset - Carry heavy dumbbell and walk 30-60 seconds',TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Plank Jacks','Superset - Jump your feet in and back out',TRUE,FALSE,TRUE,TRUE,FALSE,TRUE),
('Dumbbell Step-Down','Superset - Stand on stool and step down',TRUE,FALSE,FALSE,TRUE,TRUE,TRUE),
('Reverse Crunch','Superset - Lie on back and raise hips',TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Lying Tricep Extension','Superset - Perform skull crushers with dumbbells',TRUE,FALSE,FALSE,FALSE,TRUE,TRUE),
('Russian Twists','Superset - Use dumbbell, lean back and twist at torso',FALSE,TRUE,FALSE,FALSE,TRUE,TRUE),
('Side Plank Dips','Superset - dip at side',TRUE,FALSE,TRUE,FALSE,FALSE,TRUE),
('Landmine Should Press',NULL,TRUE,FALSE,FALSE,TRUE,TRUE,FALSE);

-- Set up many-to-many relationships
INSERT INTO workout_tracker.exercise_muscle_groups(exercise_id,muscle_group_id)
VALUES(
    (select exercise_id from workout_tracker.exercises where name = 'Body Weight Squats'),
    (select muscle_group_id from muscle_group where name = 'Legs')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Body Weight Squats'),
    (select muscle_group_id from muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Standing Opposite Elbow to Knee Crunch'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Standing Same Elbow to Knee Crunch'),
    (select muscle_group_id from muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Standing Wall Cross Climber'),
    (select muscle_group_id from muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Forearm Plank'),
    (select muscle_group_id from muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Russian Twist'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Dead Bug'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Half Kneeling Wood Chop'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Side Bend'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Standing Leg Crunch'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Bicycle Kicks - Crunches'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Superman'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Core')
),
(
    (select exercise_id from workout_tracker.exercises where name = 'Superman'),
    (select muscle_group_id from workout_tracker.muscle_group where name = 'Back')
);




