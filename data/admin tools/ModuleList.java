import java.io.BufferedReader;
import java.io.IOException;
import java.util.LinkedList;

public class ModuleList {
	private LinkedList<String> listType;
	private String listName;
	private int listSize;
	private int listRequirement;
	private LinkedList<Pair> listContent;
	private Exclusion exclusion;
	private boolean hasExclusion;
	
	public ModuleList(BufferedReader in) {
		String input;
		try {
			//Read listType
			listType = new LinkedList<String>();
			input = in.readLine().substring(10);
			String[] tokens = input.split(",");
			for (int i = 0; i < tokens.length; i++) {
				listType.add(tokens[i].trim());
			}
			
			//Read listName
			input = in.readLine();
			listName = input.substring(10).trim();
			System.out.println(listName);
			//Read listSize
			input = in.readLine();
			listSize = Integer.parseInt(input.substring(10).trim());
			System.out.println(listSize);
			//Read listRequirement
			input = in.readLine();
			listRequirement = Integer.parseInt(input.substring(17).trim());
			
			//Read listContent
			input = in.readLine().substring(15);
			String[] tokens2 = input.split(",|\\;");
			listContent = new LinkedList<Pair>();
			int i;
			for (i = 0; i < listSize*2; i++) {
				String name = tokens2[i].trim();
				System.out.println(name);
				i++;
				int number = Integer.parseInt(tokens2[i].trim());
				listContent.add(new Pair(name, number));
			}
			
			//Read exclusion
			hasExclusion = false;
			if (input.charAt(input.length()-1) == '+') {
				exclusion = new Exclusion(in.readLine());
				hasExclusion = true;
			}
		} catch (IOException e) {
	        System.out.println("File read error for list! ");
	        e.printStackTrace();
	    } 
	}
	
	public ModuleList(String name, String type) {
		listType = new LinkedList<String>();
		listType.add("exclusion");
		listName = name+ " excluded";
		listSize = 1;
		listRequirement = 1;
		listContent = new LinkedList<Pair>();
		listContent.add(new Pair(name, Integer.parseInt(type)));
		hasExclusion = false;
	}
	
	public LinkedList<String> getTypes() {
		return listType;
	}
	
	public String getName() {
		return listName;
	}
	
	public int getListSize() {
		return listSize;
	}
	
	public Pair getItem(int index) {
		return listContent.get(index);
	}
	
	public int getRequirement() {
		return listRequirement;
	}
	
	public Exclusion getExclusion() {
		return exclusion;
	}
	
	public boolean hasExclusion() {
		return hasExclusion;
	}
}
