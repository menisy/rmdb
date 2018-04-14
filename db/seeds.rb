user1 = User.new
user1.email = 'user1@rmdb.com'
user1.password = 'rmdbisthebest'
user1.password_confirmation = 'rmdbisthebest'
user1.save

user2 = User.new
user2.email = 'user2@rmdb.com'
user2.password = 'imsuchacooluser'
user2.password_confirmation = 'imsuchacooluser'
user2.save