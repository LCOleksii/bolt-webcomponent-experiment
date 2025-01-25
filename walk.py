import os
import argparse

# Default exclusions for a typical Go project
DEFAULT_EXCLUDE_FILES = {
    '.gitignore',
    'README.md',
    'pachage.json',
    'report.json',
    '.DS_Store'
}

DEFAULT_EXCLUDE_FOLDERS = {
    '.git', 
    'public', 
}

DEFAULT_EXCLUDE_EXTENSIONS = {
    '.exe', '.dll', '.so', '.dylib', '.test', '.out'
}

def should_exclude(path, filename, exclude_files, exclude_folders, exclude_extensions):
    if filename in exclude_files:
        return True
    if any(folder in path.split(os.sep) for folder in exclude_folders):
        return True
    if any(filename.endswith(ext) for ext in exclude_extensions):
        return True
    return False

def aggregate_project_files(project_root, output_file, exclude_files, exclude_folders, exclude_extensions):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(project_root):
            # Remove excluded folders
            dirs[:] = [d for d in dirs if d not in exclude_folders]
            
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, project_root)
                
                if should_exclude(relative_path, file, exclude_files, exclude_folders, exclude_extensions):
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                    
                    outfile.write(f"---\n./{relative_path}\n{content}\n")
                except Exception as e:
                    print(f"Error reading file {file_path}: {e}")

def main():
    parser = argparse.ArgumentParser(description="Aggregate project files into a single file.")
    
    parser.add_argument("project_root", help="Path to the project root")
    parser.add_argument("output_file", help="Path for the output file")

    parser.add_argument("--exclude-files", nargs="*", default=DEFAULT_EXCLUDE_FILES, help="Files to exclude")
    parser.add_argument("--exclude-folders", nargs="*", default=DEFAULT_EXCLUDE_FOLDERS, help="Folders to exclude")
    parser.add_argument("--exclude-extensions", nargs="*", default=DEFAULT_EXCLUDE_EXTENSIONS, help="File extensions to exclude")

    args = parser.parse_args()

    aggregate_project_files(
        args.project_root, 
        args.output_file, 
        set(args.exclude_files),
        set(args.exclude_folders),
        set(args.exclude_extensions)
    )
    print(f"File aggregation complete. Output saved to {args.output_file}")

if __name__ == "__main__":
    main()