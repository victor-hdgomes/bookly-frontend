interface UserWithNames {
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}

interface EmployeeWithUser {
  user: UserWithNames;
}

export function getUserDisplayName(user: UserWithNames): string {
  if (user.displayName) return user.displayName;
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  return user.email;
}

export function getEmployeeDisplayName(employee: EmployeeWithUser): string {
  return getUserDisplayName(employee.user);
}

export function getUserInitials(user: UserWithNames): string {
  if (user.displayName) {
    return user.displayName
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
  return user.email.substring(0, 2).toUpperCase();
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
