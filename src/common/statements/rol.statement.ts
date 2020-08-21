export default `
SELECT rolId = RolId 
		, rolName = RolName
		, rolDescription = RolDescription
		, enabled = Enabled
		, createdAt = CreatedAt
		, createdBy = CreatedBy
		, updatedAt = UpdatedAt
		, updatedBy = UpdatedBy
FROM	Rol
`;
